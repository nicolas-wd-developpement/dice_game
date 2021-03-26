$(document).ready(() => {
    var playerTour = 0
    var score = 0

    var width = window.innerWidth;
    var displayMobile = false
    var scorePlayerOne = 0
    var scorePlayerTwo = 0
    var newGame = $('startNewGame')
    var player1Status = $('player1Status')
    var player2Status = $('player1Status')
    var holdScorePlayer1 = 0
    var canvaDice = $('canvaDice')
    var holdScorePlayer2 = 0
    var currentScorePlayer = 0
    var playDice = $('#playDice')
    var holdScore = $('#holdScore')
    var currentScorePlayer2 = 0
    var timeoutID
    var numberOfPlayers = 0
     // This application is mobile designed first. The active gamer is only shown on mobile
   if(width<=576){
        displayMobile = true;
        $('#currentScorePlayer2').hide()
        $('#holdScorePlayer2').hide()
        $('#player2Status').hide()
        $('#bg1').hide()
        $('#bg2').hide()
        $('body').css("background-color","grey");
        }else{
        displayMobile = false;
        $('#currentScorePlayer2').show()
        $('#holdScorePlayer2').show()
        $('#player2Status').show()
    }

    const show2 = () => {
        $('body').css("background-color","pink");
        $('#currentScorePlayer1').text(currentScorePlayer)
        $('#holdScorePlayer1').text(holdScorePlayer2)
        $('#player1Status').text('player 2')
    }
    const show1 = () => {
        $('body').css("background-color","grey");
        $('#currentScorePlayer1').text(currentScorePlayer)
        $('#holdScorePlayer1').text(holdScorePlayer1)
        $('#player1Status').text('Player 1')
    }
    //const show2 = () => {
    //    $('body').css("background-color","pink");
    //    $('#currentScorePlayer1').hide()
    //    $('#holdScorePlayer1').hide()
    //    $('#player1Status').hide()
    //    $('#currentScorePlayer2').show()
    //    $('#holdScorePlayer2').show()
    //    $('#player2Status').show()
    //}
    //
    //const show1 = () => {
    //    $('body').css("background-color","grey");
    //    $('#currentScorePlayer2').hide()
    //    $('#holdScorePlayer2').hide()
    //    $('#player2Status').hide()
    //    $('#currentScorePlayer1').show()
    //    $('#holdScorePlayer1').show()
    //    $('#player1Status').show()
    //}

    const initNewGame = () => {
        twoPlayers = false
        playerTour = 0
        holdScorePlayer1 = 0
        holdScorePlayer2 = 0
        start = new CustomEvent('start')
        $('#startNewGame').off('click',initNewGame)
        updateOne()
        updateTwo()    
        do {
            numberOfPlayers = prompt("Bienvenu sur le dé fi, jouez-vous seul ou avec un partaire? entrez 1 ou 2", "Nombre de joueur ");
        }
        while (numberOfPlayers != '1' && numberOfPlayers != '2' )
        if(numberOfPlayers == '2'){
            twoPlayers = true
        }
    }

    // game Started with player 1
    const gameStarted = () => {
        $('#playDice').trigger('start');
        $('#startNewGame').off('start')
    }

    function addScore () {
        score = Math.floor(Math.random() * Math.floor(6)+1);
        currentScorePlayer = score + currentScorePlayer
        displayScore()
        if(score === 1){
            alert('vous avez tiré le 1! vous passez votre tour')
            toggleGameOnPlayed1()
            }
            index = 7
        }

    function displayScore () {
                if(displayMobile){
                $('#currentScorePlayer1').text(currentScorePlayer)
                }else{
                    if (playerTour === 0){
                        $('#currentScorePlayer1').text(currentScorePlayer)
                    }else{
                        $('#currentScorePlayer2').text(currentScorePlayer)
                    }
                 }
            }
    function displayHoldScore () {
        if(displayMobile){
            if (playerTour === 0){
                
                $('#holdScorePlayer1').text(holdScorePlayer1)
            }else{
                $('#holdScorePlayer1').text(holdScorePlayer2)
            }
        }else{
            if (playerTour === 0){
                $('#holdScorePlayer1').text(holdScorePlayer1)
            }else{
                $('#holdScorePlayer2').text(holdScorePlayer2)
            }
        }
        if(holdScorePlayer1>=100){
            alert(`Joueur 1 a gagné`)
            initNewGame()
        }
        if(holdScorePlayer2>=100){
            alert(`Joueur 2 a gagné`)
            initNewGame()
        }
    }

    function autoMode () {
        $('#playDice').off('click', addScore)
        let roundAuto = Math.floor(Math.random() * Math.floor(6)+1)
        for (let index = 0; index < roundAuto; index++) {
                score = Math.floor(Math.random() * Math.floor(6)+1);
                currentScorePlayer = score + currentScorePlayer
                displayScore()
                console.log(score)
                if(score === 1){
                    currentScorePlayer = 0
                    alert('Ordinateur a tiré 1! il passe son tour')
                    index = 7
                }
        }
        holdScorePlayer2 = holdScorePlayer2 + currentScorePlayer
        displayHoldScore()
        currentScorePlayer = 0
        displayScore()
        $('#playDice').on('click', addScore) // activation du bouton Play
        toggleGame()
    }

    function toggleGame () {
            if(playerTour === 0){
                holdScorePlayer1 = holdScorePlayer1 + currentScorePlayer
                displayHoldScore()
                currentScorePlayer = 0
                displayScore()
                if(displayMobile){
                    setTimeout(show2, 2000)
                }
                playerTour = 1
                updateOne()
                updateTwo()
                if(!twoPlayers){
                    autoMode()
                }
            }else{
                holdScorePlayer2 = holdScorePlayer2 + currentScorePlayer
                displayHoldScore()
                currentScorePlayer = 0
                displayScore()
                if(displayMobile){
                    setTimeout(show1, 3000)
                }
                playerTour = 0
                updateOne()
                updateTwo()
            }
    }

    function toggleGameOnPlayed1 () {
        if(playerTour === 0){
            currentScorePlayer = 0
            displayScore()
            if(displayMobile){
            setTimeout(show2, 3000)
            }
            updateOne()
            updateTwo()
            toggleGame()
        }else{
            currentScorePlayer = 0
            displayScore()
            if(displayMobile){
            setTimeout(show1, 3000)
            }
            updateOne()
            updateTwo()
            toggleGame()
        }
    }

    $('#startNewGame').on('click',initNewGame)
    $('#playDice').on('click', addScore)
    $('#holdScore').on('click',toggleGame)

    //Ecouter l'événement.

    //distribuer l'événement.

updateOne = () => {
    var activePlayer1 = document.getElementById("activePlayer1");
    var ctx = activePlayer1.getContext("2d");
    ctx.beginPath();
    ctx.arc(20, 20, 10, 0, 2 * Math.PI);
    if (playerTour===0){
        color = 'red'
    } else {
        color = 'black'
    }
    ctx.fillStyle = color;
    ctx.fill()
}

updateTwo = () => {
    var activePlayer2 = document.getElementById("activePlayer2");
    var ctx2 = activePlayer2.getContext("2d");
    ctx2.beginPath();
    ctx2.arc(20, 20, 10, 0, 2 * Math.PI);
    if (playerTour===1){
        color = 'red'
    } else {
        color = 'black'
    }
    ctx2.fillStyle = color;
    ctx2.fill()
}

var width = window.innerWidth/3;
var height = window.innerHeight/5;
var xPos = window.innerWidth;
var yPos = window.innerHeight;
var stage = new Konva.Stage({
  container: 'dice',
  width: width,
  height: height,
});

function upDateCanvaDice () {
if(!displayMobile){
    var layer = new Konva.Layer();
    var rect1 = new Konva.Rect({
    x: width/2 -52,
    y:10,
    width: 100,
    height: 100,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 2,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: { x: 0, y: 0 },
    shadowOpacity: 0.5,
    });

    // add the shape to the layer
    //layer.add(rect1);

    var circle1 = new Konva.Circle({
    x: width /2 - 5,
    y: height / 2 - 10,
    radius: 5,
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    });

    // add the shape to the layer
    //layer.add(circle1);

    var circle2 = new Konva.Circle({
    x: width /2 - 30,
    y: height / 2 - 37.5,
    radius: 5,
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    });
    //layer.add(circle2);

    var circle3 = new Konva.Circle({
    x: width /2 + 20,
    y: height / 2 - 37.5,
    radius: 5,
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    });
    // layer.add(circle3);

    var circle4 = new Konva.Circle({
    x: width /2 + 20,
    y: height / 2 + 12.5,
    radius: 5,
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    });
    //layer.add(circle4);

    var circle5 = new Konva.Circle({
    x: width /2 - 30,
    y: height / 2 - 10.5,
    radius: 5,
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    });

    var circle6 = new Konva.Circle({
    x: width /2 - 30,
    y: height / 2 + 12.5,
    radius: 5,
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    });
    //layer.add(circle6);

    var circle7 = new Konva.Circle({
    x: width /2 + 20,
    y: height / 2 - 10.5,
    radius: 5,
    fill: 'red',
    stroke: 'red',
    strokeWidth: 1,
    });


    // add the layer to the stage
    layer.add(rect1)
    switch (score) {
    //refresh
    case 1:
        layer.add(circle1);
        break;

    case 2:
        layer.add(circle2);
        layer.add(circle4);
        break;
    case 3:
        layer.add(circle2);
        layer.add(circle1);
        layer.add(circle4)

        break;

    case 4:
        layer.add(circle2);
        layer.add(circle3);
        layer.add(circle4);
        layer.add(circle6);
        break;

    case 5:
        layer.add(circle1);
        layer.add(circle2);
        layer.add(circle3);
        layer.add(circle4);
        layer.add(circle6);
        break;

    case 6:
        layer.add(circle2);
        layer.add(circle3);
        layer.add(circle4);
        layer.add(circle5);
        layer.add(circle6);
        layer.add(circle7);

        break;

    default:
        layer.add(rect1)
        break;
    }
}

stage.add(layer);
}
$('#playDice').on('click', upDateCanvaDice)

})
