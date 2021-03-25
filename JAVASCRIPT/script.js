$(document).ready(() => {
   // This application is mobile designed first. The active gamer is only shown on mobile
   if(width<=576){
    displayMobile = true;
    $('#currentScorePlayer2').hide()
    $('#holdScorePlayer2').hide()
    $('#player2Status').hide()
    }else{
    displayMobile = false;
    $('#currentScorePlayer2').show()
    $('#holdScorePlayer2').show()
    $('#player2Status').show()
    }
})
   
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

function delayed () {
    timeoutID = window.setTimeout(()=>{

    },2000) 
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
    playerTour = 0
    holdScorePlayer1 = 0
    holdScorePlayer2 = 0
    start = new CustomEvent('start')
    $('#startNewGame').off('click',initNewGame)
}

// game Started with player 1
const gameStarted = () => {
    $('#playDice').trigger('start');
    $('#holdScore').trigger('gamerOnePlayed')
    $('#holdScore').trigger('gamerTwoPlayed')
    gamerOnePlayed = new CustomEvent('gamerOnePlayed')
  }

const dice = () => {
    score = Math.floor(Math.random() * Math.floor(6) + 1) + score;
}

const addScore = () => {
    currentScorePlayer = currentScorePlayer + Math.floor(Math.random() * Math.floor(6) + 1)
    displayScore()
}

const displayScore = () =>{
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
const displayHoldScore = () =>{
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
}


const toggleGame = () => {
    if(playerTour === 0){
        holdScorePlayer1 = holdScorePlayer1 + currentScorePlayer
        displayHoldScore()
        currentScorePlayer = 0
        if(displayMobile){
          setTimeout(show2, 3000)
        }playerTour = 1
    }else{
        holdScorePlayer2 = holdScorePlayer2 + currentScorePlayer
        displayHoldScore()
        currentScorePlayer = 0
        if(displayMobile){
          setTimeout(show1, 3000)
        }playerTour = 0
    }
}


$('#startNewGame').on('click',initNewGame)
$('#playDice').on('click', addScore)
$('#holdScore').on('click',toggleGame)








//Ecouter l'événement.

//distribuer l'événement.

           

