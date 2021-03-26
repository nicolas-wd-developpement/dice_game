$(document).ready(function(){

    $('#startNewGame').mouseover(function(){
        $('#startNewGame').css('color', '#3880ff').css('textShadow','rgba(255, 150, 255, 1) 3px 1px 1px').css('cursor','pointer');
    });

    $('#startNewGame').mouseout(function(){
        $('#startNewGame').css('color', 'black').css('textShadow','black 0px 0px 0px');
    });

    $('#player1Status').mouseover(function(){
            $('#player1Status').css('color', '#3880ff').css('textShadow','rgba(255, 150, 255, 1) 3px 1px 1px').css('cursor','pointer');
    });
    $('#player1Status').mouseout(function(){
        $('#player1Status').css('color', 'black').css('textShadow','black 0px 0px 0px');
    });


    $('#player2Status').mouseover(function(){
        $('#player2Status').css('color', '#3880ff').css('textShadow','rgba(255, 150, 255, 1) 3px 1px 1px').css('cursor','pointer');
    });
    $('#player2Status').mouseout(function(){
        $('#player2Status').css('color', 'black').css('textShadow','black 0px 0px 0px');
    });

    $('#playDice').mouseover(function(){
        $('#playDice').css('color', '3880ff').css('textShadow','rgba(255, 150, 255, 1) 3px 1px 1px').css('cursor','pointer');
    });
    
    $('#playDice').mouseout(function(){
        $('#playDice').css('color', 'black').css('textShadow','black 0px 0px 0px');
    });

    $('#holdScore').mouseover(function(){
        $('#holdScore').css('color', '#3880ff').css('textShadow','rgba(255, 150, 255, 1) 3px 1px 1px').css('cursor','pointer');
    });
    $('#holdScore').mouseout(function(){
        $('#holdScore').css('color', 'black').css('textShadow','black 0px 0px 0px');
    });
    $('#playDice').mouseover(function(){
        $('#playDice').css('color', '#3880ff').css('textShadow','rgba(255, 150, 255, 1) 3px 1px 1px').css('cursor','pointer');
    });
    $('#playDice').mouseout(function(){
        $('#playDice').css('color', 'black').css('textShadow','black 0px 0px 0px');
    });
});