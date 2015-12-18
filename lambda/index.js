var elasticsearch = require('elasticsearch');
var _ = require('lodash');

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
            fields: ["page_urlquery", "geo_country"],
            size: 10,
            sort: [{_timestamp: {order: "desc"}}]
        }
    }).then(function (results) {
        var json = _(results.hits.hits).pluck("fields").value();
        console.log(json);
        context.succeed(json);
    }, function (error) {
        context.fail(error);
    });
};
