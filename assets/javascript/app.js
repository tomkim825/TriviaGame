// code to make sure everything is ready before excuting rest of code
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
    }
    ];

// Declare other global variable
    var gameStarted = false
    var t = 0;
    var x=0;
    var quizQuestion;
    var quizAnswer;
    var correctAnswer;
    var correctPicture
    var score = 0;
    var answeredCorrectly;
    var questionsLeft = quizInfo.length;
    var displayTimeLeft;
    var gameover = false ;
// ****************************************
// **  initialize script with info above **
// ****************************************
 
    // wondering if below function is redundant 
    // function timeLeft() {var displayTimeLeft = setTimeout(showAnswer(), 1000 * 30);};
    // function (while game is not over) will check answer and clear the time 
    function clickAnswer(){
        if(!gameover){
            $('.answer').on('click',function(){
                if(this.id == correctAnswer){
                    score++;
                    answeredCorrectly = true; console.log(answeredCorrectly);
                    clearInterval(displayTimeLeft);
                    showAnswer();
                } else{answeredCorrectly=false; console.log(answeredCorrectly);};
            });
        };    
     };

// a 2nd event - starts or resets the timer and puts it into HTML 
    function reset30SecTimer() {var displayTimeLeft = setInterval(function(){
    if(t>=0){
    $('#time-left').text(t);
    t--;
    } else {
    console.log("done");
    clearInterval(displayTimeLeft);
    showAnswer();
    }; 
    }, 1000);
};

    // show answer, stops time, updates score, moves to next question in 3 seconds
    // all answers are stylized red border, red text, pink background, low opacity
    // correct answer is then chosen and re-stylized green border, white background, no opacity
    function showAnswer(){
        clearInterval(displayTimeLeft);
        $('.answer-box').css("display","block").css("background-image",correctPicture).css("background-size","contain").css("background-repeat","no-repeat").css("background-position","right 10%");
        $('#score').text(score);
        if(answeredCorrectly){ $('#question').text("CORRECT!");} else {$('#question').text("WRONG!");};
       
        for(i=1;i<(quizInfo[0].answers.length+1);i++){
        $('#answer-'+i).css("border-color","red").css("color","red").css("background-color","pink").css("opacity","0.2");
        };
        $('#'+correctAnswer).css("border-color","green").css("color","green").css("background-color","white").css("opacity","1");
        questionsLeft --;
        
        if(questionsLeft>0){ setTimeout(nextQuestion,3000)};
    };    

// [a 2nd event]. Resets styling on choices and iterates (or intializes) to next question. Then written to HTML. For-loop resets css. question info grabbed from array iterated by x, which is advanced by x++ at end. If x reaches all questions, gameover() called 
    function nextQuestion(){
        for(i=1;i<(quizInfo[0].answers.length+1);i++){
            $('#answer-'+i).css("border-color","gray").css("color",'#555').css("background-color","rgb(230, 230, 230)").css("opacity","1");
        };
        $('.answer-box').css("display","block").css("background-image","")
        quizQuestion = quizInfo[x].question;
        quizAnswer = quizInfo[x].answers;
        correctAnswer = quizInfo[x].correct;
        correctPicture = quizInfo[x].picture;
        $('#question').text(quizQuestion);
        $('#answer-1').text(quizAnswer[0]);
        $('#answer-2').text(quizAnswer[1]);
        $('#answer-3').text(quizAnswer[2]);
        x++;
    };

// [1st event] Start game with enter key press. Set gamestarted = true to prevent strange behavior if enter key pressed accidentally during quiz. answer fields will become visible
// (next) go to reset30SecTimer & nextQuestion to begin 30 sec timer and advance to questions
    $("body").keypress(function (event) {
        if ((event.key == "Enter") && (!gameStarted)){
            gameStarted = true
            reset30SecTimer();
            $('.answer').css('display','block');
            $('#playagain').css("display","none");
            nextQuestion();
        }
    });

//[last event] resets variables for next game and starts questions over again from 1st one.
    function resetGame() {
        gameover = false;
        x=0;
        score=0;
        $('#answer-3').css("display","block");
        $('#playagain').css("display","none");
        nextQuestion();
    };



    // click answer
    $('.answer').on('click',function(){
        if(this.id == correctAnswer){
            score++;
            answeredCorrectly = true;
            console.log("clicked");
        } else {answeredCorrectly = false;};
        showAnswer();
        // checks if last question answered
        if(x === quizInfo.length){
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
    });

});    
