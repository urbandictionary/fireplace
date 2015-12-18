jQuery.fx.interval = 50;

$(document).ready(function (e) {
    window.queue = [];
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
    $.getJSON("https://eq2ytuibq4.execute-api.us-east-1.amazonaws.com/prod/recent").done(function (response) {
        console.log(response);
        window.queue = window.queue.concat(response);
    });
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fallingWord() {
    var text = window.queue.shift();
    if (text) {
        var item = $("<div>").attr({class: "fallingObject"});
        item.text(text.term);
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