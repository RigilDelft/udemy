window.onload = function () {
    "use strict";

    var playingState = 'idle',
        totalScore = 0,
        timeLeft = 60,
        correctAnswer;

    function generateQA() {
        var number1, number2,
            answer1, answer2, answer3,
            place;
        
        // Generate question (two numbers between 0 and 10)
        number1 = Math.round(Math.random() * 10);
        number2 = Math.round(Math.random() * 10);
        correctAnswer = number1 * number2;
        document.getElementById("question").innerHTML = number1 + "x" + number2;
        
        // Generate possible answers, different from correct answer and each other.
        // To avoid easiness, don't use 0 and 1 as multiplyers.
        do {
            answer1 = Math.max(2, number2) * Math.round(Math.random() * 10);
        } while (answer1 === correctAnswer);
        answer2 = Math.max(2, number1) * Math.round(Math.random() * 10);
        do {
            answer2 = Math.max(2, number1) * Math.round(Math.random() * 10);
        } while ((answer2 === correctAnswer) || (answer2 === answer1));
        answer3 = Math.max(2, number2) * Math.round(Math.random() * 10);
        do {
            answer3 = Math.max(2, number1) * Math.round(Math.random() * 10);
        } while ((answer3 === correctAnswer) || (answer3 === answer1) || (answer3 === answer2));
        
        // Place correct answer on a random place and the other answers on the remaining places
        place = 1 + Math.floor(Math.random() * 4);
        document.getElementById("box" + place).innerHTML = correctAnswer;
        place = (place % 4) + 1;
        document.getElementById("box" + place).innerHTML = answer1;
        place = (place % 4) + 1;
        document.getElementById("box" + place).innerHTML = answer2;
        place = (place % 4) + 1;
        document.getElementById("box" + place).innerHTML = answer3;
    }
    
    function showScore() {
        document.getElementById("scorevalue").innerHTML = totalScore;
    }
    
    // If we click on the start/reset button
    document.getElementById("startreset").onclick = function () {
        if ((playingState === 'playing') || (playingState === 'gameover')) {
            window.location.reload();
        } else {
            playingState = 'playing';
            
            // Set score to 0
            totalScore = 0;
            showScore();
            
            // Change button text to reset
            document.getElementById("startreset").innerHTML = "Reset spel";
            
            // Show countdown box
            document.getElementById("timeremaining").style.display = "block";
            
            // Generate question and answers
            generateQA();
            
            // Reduce timer
            var counter = document.getElementById("timeremainingvalue"),
                myCounter = setInterval(function () {
                    timeLeft -= 1;
                    counter.innerHTML = timeLeft;
                    if (timeLeft === 0) {
                        // Game over
                        clearInterval(myCounter);
                        document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>Je score is: " + totalScore + "</p>";
                        document.getElementById("gameover").style.display = "block";
                        document.getElementById("timeremaining").style.display = "none";
                        playingState = 'gameover';
                    }
                }, 1000);
        }
    };
    
    function showBlock(block) {
        var showMessage;
        
        // Show block for a second
        document.getElementById(block).style.display = "block";
        showMessage = setTimeout(function () {
            document.getElementById(block).style.display = "none";
        }, 1000);
    }
    
    function checkAnswer(box) {
        var answer;
        
        if (playingState === 'playing') {
            answer = parseInt(document.getElementById(box).innerHTML, 10);
            if (answer === correctAnswer) {
                totalScore += 1;
                showScore();

                // Show 'correct' block for a second
                showBlock("correct");
                
                // Generate new question
                generateQA();
            } else {
                showBlock("wrong");
            }
        }
    }
    
    // If we click on an answer box
    document.getElementById("box1").onclick = function () {
        checkAnswer("box1");
    };
    document.getElementById("box2").onclick = function () {
        checkAnswer("box2");
    };
    document.getElementById("box3").onclick = function () {
        checkAnswer("box3");
    };
    document.getElementById("box4").onclick = function () {
        checkAnswer("box4");
    };
};