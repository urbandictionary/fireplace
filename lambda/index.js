var elasticsearch = require('elasticsearch');
var _ = require('lodash');
var url = require('url');

exports.handler = function (event, context) {
    console.log("==================================");
    console.log(event, process.env);
    console.log("==================================");

    var client = new elasticsearch.Client({
        host: process.env.ELASTICSEARCH_URL,
        log: 'trace'
    });

    client.search({
        index: "snowplow",
        type: "hit",
        body: {
            query: {filtered: {filter: {term: {page_urlpath: "/define.php"}}}},
            fields: ["page_url", "geo_country"],
            size: 10,
            sort: [{_timestamp: {order: "desc"}}]
        }
    }).then(function (results) {
        function mapping(fields) {
            var country = fields.geo_country[0];
            var query = url.parse(fields.page_url[0], true).query;
            return {country: country, term: query.term};
        }

        var json = _(results.hits.hits).pluck("fields").map(mapping).value();

        console.log(json);
        context.succeed(json);
    }, function (error) {
        context.fail(error);
    });
};
