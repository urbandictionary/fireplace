jQuery.fx.interval = 50;

$(document).ready(function (e) {
    window.fallingID = 0;
    window.strings = [];
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
            fontSize: random(48, 72),
            opacity: 0
        });
        item.animate({opacity: 0.8}, 5000).appendTo($("#wrapper"));

        setTimeout(function () {
            item.fadeOut(5000, function () {
                item.remove();
            });
        }, 20 * 1000);
    } else {
        getJson();
    }
}