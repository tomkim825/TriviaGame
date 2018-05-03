// doc ready function to make sure everything is ready before excuting rest of code
$(document).ready(function() {

    var quizInfo = [
    {
        "question": 'What year did the "War of 1812" happen?',
        "answers": ["1912","2018","1812"],
        "correct":"answer-3",
        "picture":"url('./assets/images/1812.jpg')"
    },
    {
        "question": "What ingredient is added to white sugar to make brown sugar?",
        "answers": ["maple syrup","molasses","coffee"],
        "correct":"answer-2",
        "picture":"url('./assets/images/brownsugar.jpg')"
    },
    {
        "question": "What is the only U.S. state without a rectangular flag?",
        "answers": ["Missouri","Montana","Ohio"],
        "correct":"answer-3",
        "picture":"url('./assets/images/ohio.jpg')"
    },
    {
        "question": "What is the most visited museum in Europe?",
        "answers": ["Louvre","Smithonian","Guttenberg Museum"],
        "correct":"answer-1",
        "picture":"url('./assets/images/louvre.jpg')"
    },
    {
        "question": "How do you say panda in Spanish?",
        "answers": ["Panda","Oso blanco","Ovejas"],
        "correct":"answer-1",
        "picture":"url('./assets/images/panda.jpg')"
    },
    {
        "question": " % CO2 that reduces your brain's cognitive abilities? Our room is 0.15% Outside air is 0.04%",
        "answers": ["3%","0.5%","0.10%"],
        "correct":"answer-3",
        "picture":"url('./assets/images/CO2.png')"
    }
    ];

// Declare other global variable
    var gameStarted = false
    var x=0;
    var quizQuestion;
    var quizAnswer;
    var correctAnswer;
    var correctPicture
    var score = 0;
    var answeredCorrectly;
    var questionsLeft = quizInfo.length;
    var intervalId;
    var number;
    var gameover = false ;

//      ****************************************
//      **  initialize script with info above **
//      ****************************************
//      **    Gameplay part of script below   **
//      ****************************************

function stopTimer() {
    clearInterval(intervalId);
  };

    // wondering if below function is redundant 
    // function timeLeft() {var displayTimeLeft = setTimeout(showAnswer(), 1000 * 30);};
    // function (while game is not over) will check answer and clear the time 

// [3rd event] User clicks on an answer. Timer stops If not gameover, checks if correct answer, updates score. 
// Sets answeredCorrectly to true or false to later show "Correct or Wrong". Then showAnswer function
// function clickAnswer(){
//     if(!gameover){
//         $('.answer').on('click',function(){
//             stopTimer();
//             if(this.id == correctAnswer){
//                 score++;
//                 answeredCorrectly = true;
//             } else{answeredCorrectly=false;};
//             showAnswer();
//         });
//     };    
//     };


// [3rd event] (re)sets the timer using countdown function and displays it in HTML 
function resetTimer(number) {
    stopTimer();
    intervalId = setInterval(function countDown() {
        $('#time-left').text(number);
        number --;
        if (number === 0) {
            stopTimer();
            showAnswer();
        };    
    }, 1000);
};

// [4th event] clear timer, set it to 3 sec, start timer, stylize answers green/red and show
// after this, move on to next question if there are questions left
function showAnswer() {
        $('.answer-box').css("background-image",correctPicture).css("background-size","contain").css("background-repeat","no-repeat").css("background-position","right 10%");
        $('#score').text(score);
        if(answeredCorrectly){ $('#question').text("CORRECT!");} else {$('#question').text("WRONG!");};
        for(i=1;i<(quizInfo[0].answers.length+1);i++){
        $('#answer-'+i).css("border-color","red").css("color","red").css("background-color","pink").css("opacity","0.2");
        };
        $('#'+correctAnswer).css("border-color","green").css("color","green").css("background-color","white").css("opacity","1");
        questionsLeft --;
        if(questionsLeft>0){
            nextQuestion();
        };
        
    };    

// [2nd event]. Resets styling on choices and iterates (or intializes) to next question. Then written to HTML. For-loop resets css. question info grabbed from array iterated by x, which is advanced by x++ at end. If x reaches all questions, gameover() called 
    function nextQuestion(){
            // (re)sets styling on all 3 answer choices
        for(i=1;i<(quizInfo[i].answers.length+1);i++){
            $('#answer-'+i).css("border-color","gray").css("color",'#555').css("background-color","rgb(230, 230, 230)").css("opacity","1");
        };
            // removes answer picture
        $('.answer-box').css("background-image","")
            // iterates through the info array/object and stores info in variables
        quizQuestion = quizInfo[x].question;
        quizAnswer = quizInfo[x].answers;
        correctAnswer = quizInfo[x].correct;
        correctPicture = quizInfo[x].picture;
            // updates HTML with quiz info
        $('#question').text(quizQuestion);
        $('#answer-1').text(quizAnswer[0]);
        $('#answer-2').text(quizAnswer[1]);
        $('#answer-3').text(quizAnswer[2]);
            // Iterates x (to go through quiz info)
        x++;
        resetTimer(30);
    };

// [1st event] Start game with enter key press. Set gamestarted = true to prevent strange behavior if enter key pressed accidentally during quiz. answer fields will become visible
// (next) go to resetTimer & nextQuestion to begin 30 sec timer and advance to questions
    $("body").keypress(function (event) {
        if ((event.key == "Enter") && (!gameStarted)){
            gameStarted = true
            // sets answer field visible and removes "play again?" element 
            $('.answer').css('display','block');
            $('#playagain').css("display","none");
            nextQuestion();
        }
    });

//[last event] resets variables for next game and starts questions over again from 1st one.
    function resetGame() {
        gameover = false;
        questionsLeft = quizInfo.length;
        x=0;
        score=0;
        $('#score').text(score);
        $('#answer-3').css("display","block");
        $('#playagain').css("display","none");
        nextQuestion();
    };

// [3rd event] User clicks on an answer. Timer stops If not gameover, checks if correct answer, updates score. 
// Sets answeredCorrectly to true or false to later show "Correct or Wrong". Then showAnswer function
    
    $('.answer').on('click', function() {
        if(!gameover){
        answeredCorrectly = false;
        stopTimer();
        if(this.id == correctAnswer){
            score++;
            answeredCorrectly = true;
        };
        showAnswer();
        // checks if last question answered
        if(x === quizInfo.length+1){
            gameover = true; 
            for(i=1;i<(quizInfo[0].answers.length+1);i++){
                $('#answer-'+i).css("border-color","black").css("color","black").css("background-color","white").css("opacity","1").css("filter","blur(0px)");
                };
            $('#question').text("Game Over");
            $('#answer-1').text("Correct: "+ score);
            $('#answer-2').text("Incorrect: "+ (quizInfo.length-score));
            $('#answer-3').css("display","none");
            $('#playagain').css("display","block").on('click',function(){resetGame();});
        };
        };  
    });
    
});    
