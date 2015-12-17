$(document).ready(function(e) {
    window.windowHeight = $("#FallingContentWrapper").height();
    window.windowWidth = $("#FallingContentWrapper").width();
    window.fallingID = 0;
    // window.fallingString = ["IBM, internet of things","Cricket T-20 World cup", "Carebian Premium League", "Managed Services", "Hosting Services", "Falling Text"];
    window.fallingString = [];
    window.fontcolor = ["#fff", "#A2E32A", "#2A45E3", "#E0E32A", "#E32AE0", "#FCF5FC", "#F92008", "#08F9F1", "#066360", "#4EE82C"];
    StartFalling();
    embed_video();
});
$(window).resize(function(e) {
       window.windowHeight = $("#FallingContentWrapper").height();
       window.windowWidth = $("#FallingContentWrapper").width()-100;
});
    function get_JsonData(){
        var randomAPI = "http://api.urbandictionary.com/v0/random";
        $.getJSON( randomAPI, {
                    tagmode:"any",
                    format:"json"
            }).done(function( randomData ){
                for(var i in randomData.list){
                    if(randomData.list[i]["word"]!=undefined){
                        window.fallingString.push(randomData.list[i]["word"]);
                    }
                }
            }).fail().always();
    }
    function StartFalling()
    {
        get_JsonData();
        window.setInterval(CreateObject, 500);
    }
    
    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function CreateObject()
    {
        var new_string = window.fallingString[getRandomInt(0, window.fallingString.length -1)];
        if(new_string != undefined){
                $("#FallingContentWrapper").append("<div class='fallingObject' id='item" + fallingID + "'>" + 
                    new_string + "</div>"); 
                    var new_left = getRandomInt(0, windowWidth-100);
                $("#item" + fallingID).css("left", new_left);
                $("#item" + fallingID).css("font-size", getRandomInt(16, 32));
                $("#item" + fallingID).css("color", window.fontcolor[getRandomInt(0, window.fontcolor.length -1)]);
                $("#item" + fallingID).css("top", window.windowHeight);
                
                $("#item" + fallingID).animate({top: '-50px'
                  }, 15000, function() {
                    $(this).remove();
                  });
                  
                fallingID++;
            }
    }
    function embed_video(){
        $('#video').YTPlayer({
            fitToBackground: true,
            videoId: '0fYL_qiDYf0'
        });
    }