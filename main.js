jQuery.fx.interval = 50;

$(document).ready(function (e) {
    window.fallingID = 0;
    window.strings = [];
    window.colors = ["#F1E0CE", "#6C2C00", "#E0E0DE", "#DEDFDD"];

    getJson();

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
        window.setInterval(fallingWord, 2000);
    });
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fallingWord() {
    var new_string = window.strings[random(0, window.strings.length - 1)];
    if (new_string != undefined) {
        var item = $("<div>").attr({class: "fallingObject"});
        item.text(new_string);
        item.css({
            left: random(0, $("#wrapper").width() - 100),
            fontSize: random(16, 32),
            color: window.colors[random(0, window.colors.length - 1)]
        });
        item.appendTo($("#wrapper"));
    }
}