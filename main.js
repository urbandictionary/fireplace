jQuery.fx.interval = 50;

$(document).ready(function (e) {
    window.fallingID = 0;
    window.strings = [];

    getJson();
    window.setInterval(fallingWord, 3000);

    $('#video').YTPlayer({
        videoId: 'lGNXVhMLw8o',
        playerVars: {
            start: 59,
            mute: true
        }
    });
});

function getJson() {
    $.getJSON("http://api.urbandictionary.com/v0/random").done(function (randomData) {
        for (var i in randomData.list) {
            if (randomData.list[i]["word"] != undefined) {
                window.strings.push(randomData.list[i]["word"]);
            }
        }
    });
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fallingWord() {
    var text = window.strings.shift();
    if (text) {
        var item = $("<div>").attr({class: "fallingObject"});
        item.text(text);
        item.css({
            left: random(0, $("#wrapper").width() - 100),
            fontSize: random(32, 48)
        });
        item.appendTo($("#wrapper"));

        setTimeout(function () {
            item.remove();
        }, 20 * 1000);
    } else {
        getJson();
    }
}