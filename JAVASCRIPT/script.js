$(document).ready(() => {
    var playerTour = 0
    var score = 0
    var width = window.innerWidth;
    var displayMobile = false
    var holdScorePlayer1 = 0
    var holdScorePlayer2 = 0
    var currentScorePlayer = 0
    var numberOfPlayers = 0
    var twoPlayers = false
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


    // function show 1 and show 2 are used in mobile mode only => Both players scores are shown on the same ID element of the DOM
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
    

    // function called by clicking on NEW GAME and when a game is won by a player
    // => activates the playing buttons and updated the player status
    // prompt the gamers the players number
    const initNewGame = () => {
        start = new CustomEvent('start')
        $('#startNewGame').off('click',initNewGame)
        $('#playDice').on('click', addScore)
        $('#holdScore').on('click',toggleGame)
        updateOne()
        updateTwo()    
        do {
            numberOfPlayers = prompt("Bienvenu sur le dé fi, jouez-vous seul ou avec un partaire? entrez 1 ou 2", "Nombre de joueur ");
        }
        while (numberOfPlayers != '1' && numberOfPlayers != '2' )
        if(numberOfPlayers == '2'){
            twoPlayers = true
        }
        if(numberOfPlayers == '1'){
            twoPlayers = false
        }
    }
        
    //function used when playing dice.
    function addScore () {
            score = Math.floor(Math.random() * Math.floor(6)+1);
            currentScorePlayer = score + currentScorePlayer
            upDateCanvaDice()
            displayScore()
            if(score === 1){
                alert('vous avez tiré le 1! vous passez votre tour')
                currentScorePlayer = 0
                toggleGame()
                }
                index = 7
            }

    // This function is designed for mobile first display of the ROUND SCORE. All gaming information are displayed on the player 1 screen
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

    // This function is designed for mobile first display of the HOLD SCORE. All gaming information are displayed on the player 1 screen
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
    }

    // function used in One player mode. The controler will play a maximum of 6 times
    function autoMode () {
        let roundAuto = Math.floor(Math.random() * Math.floor(6)+1)
        for (let index = 0; index < roundAuto; index++) {
                score = Math.floor(Math.random() * Math.floor(6)+1);
                currentScorePlayer = score + currentScorePlayer
                displayScore()
                if(score === 1){
                    currentScorePlayer = 0
                    alert('Ordinateur a tiré 1! il passe son tour')
                    index = 7
                }
        }
        holdScorePlayer2 = holdScorePlayer2 + currentScorePlayer
        currentScorePlayer = 0
        displayHoldScore()
        displayScore()
        toggleGame()
    }

    // The function toggle game is used each time a gamer or controler finished a ROUND By holding score or play 1)
    // If one of the two players win, the game is reloaded automatically.
    function toggleGame () {
            if(playerTour === 0){
                holdScorePlayer1 = holdScorePlayer1 + currentScorePlayer
                displayHoldScore()
                currentScorePlayer = 0
                displayScore()
                if(holdScorePlayer1>=100){
                    alert(`Joueur 1 a gagné`)
                    location.reload();
                }
                
                if(displayMobile){
                    setTimeout(show2, 3000)
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
                if(holdScorePlayer2>=100){
                    alert(`Joueur 2 a gagné`)
                    location.reload();
                }
                if(displayMobile){
                    setTimeout(show1, 3000)
                }
                playerTour = 0
                updateOne()
                updateTwo()
            }
    }

    // Active player status diplay : Player 1
    updateOne = () => {
        if(!displayMobile){
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
    }

    // Active player status diplay : Player 2
    // programmed in pure JS (witout JQUERY or KONVA)
    updateTwo = () => {
        if(!displayMobile){
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
    }

    // Display of the dynamic dice only in desk mode
    // Konva library is used
    function upDateCanvaDice () {
        if(!displayMobile){
            // Display of the dynamic dice
        // Konva library is used
        var width = window.innerWidth/3;
        var height = window.innerHeight/5;
        var stage = new Konva.Stage({
            container: 'dice',
            width: width,
            height: height,
        });

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
        var circle1 = new Konva.Circle({
        x: width /2 - 5,
        y: height / 2 - 10,
        radius: 5,
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        });

        // add the shape to the layer

        var circle2 = new Konva.Circle({
        x: width /2 - 30,
        y: height / 2 - 37.5,
        radius: 5,
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        });

        var circle3 = new Konva.Circle({
        x: width /2 + 20,
        y: height / 2 - 37.5,
        radius: 5,
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        });

        var circle4 = new Konva.Circle({
        x: width /2 + 20,
        y: height / 2 + 12.5,
        radius: 5,
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        });

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

        var circle7 = new Konva.Circle({
        x: width /2 + 20,
        y: height / 2 - 10.5,
        radius: 5,
        fill: 'red',
        stroke: 'red',
        strokeWidth: 1,
        });


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
        stage.add(layer);
    }

    }
    $('#startNewGame').on('click',initNewGame)

})
