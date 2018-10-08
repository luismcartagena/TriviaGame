// Questions
var questions = [
    {
        text: "Does rain fall from the sky?",
        options: ["Yes", "No"],
        answer: 0 // the index of the correct answer
    }, {
        text: "Does Mark Love Jordans>",
        options: ["Hecky Naw!", "He loves Adidas", "For Sure he does!"],
        answer: 2
    }
];

// timer id
var gameTimer;
var questionIndex = 0; // which question am I on?
var totalGameTime = 30;
var numCorrect = 0;
var numIncorrect = 0;

$(".start-button").on("click", function () {
    $("#instructions").hide();
    // this is the thing that was clicked!
    $(this).hide();

    // start the game
    startGame();
});



// ORGANIZE CODE
// CALLBACK
// PERFORM REPETITIVE TASK

function startGame() {
    // hide the results if they are showing
    $("#results").hide();
    $("#questions").show();
    $("#questions").empty();

    // display timer!
    $(".timer").text(totalGameTime);
    // Start a timer
    startTimer();
    // display a question
    displayQuestion();
    // set the score (numCorrect, numIncorrect)
}
function startTimer() {
    gameTimer = setInterval(function () {
        totalGameTime--;
        $(".timer").text(totalGameTime);

        if (totalGameTime === 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameTimer);
    $("#questions").hide();
    // display a message
    $("#results").html(
        `<p>Thanks For Playing</p>
         <p>You got ${numCorrect} correct and ${numIncorrect} wrong.</p>
        `
    );
    $("#results").show();
    // reset the game
    numCorrect = 0;
    numIncorrect = 0;
    totalGameTime = 30;
    questionIndex = 0;
    // and anything else
    $(".start-button").show();
}

function displayQuestion() {
    /**
     *      <div>
                <p>Question text</p>
                <button class="btn">Yes</button>
                <button class="btn">No</button>
            </div>
     */
    var currentQuestion = questions[questionIndex];
    var parentDiv = $("<div>");
    var pQuestionText = $("<p>");
    pQuestionText.text(currentQuestion.text);

    parentDiv.append(pQuestionText);
    // dynamically display the options for the
    // the user
    for (var i = 0; i < currentQuestion.options.length; i++) {
        var optionButton = $("<button>");
        optionButton.addClass("btn btn-info answer");
        optionButton.text(currentQuestion.options[i]);
        optionButton.val(i);

        parentDiv.append(optionButton);
    }

    $("#questions").append(parentDiv);
}

// event delegation
// this handles dynmically generated buttons
// check out google or jquery docs for more info
$(document).on("click", ".answer", function () {
    var clickedButton = $(this);
    // check for correct answer
    if (+clickedButton.val() === questions[questionIndex].answer) {
        numCorrect++;
    } else {
        numIncorrect++;
    }

    // Go on to the next question
    questionIndex++;

    if (questionIndex === questions.length) {
        endGame();
    } else {
        $("#questions").empty();
        displayQuestion();
    }
});
