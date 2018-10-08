// Questions
var questions = [
    {
        text: "Which of the following is likely to increase biodiversity within a biome?",
        options: ["Landscape fragmentation", "Introduction of an invasive species", "Immigration of humans", "Speciation", "A disease epidemic"],
        answer: 3 // the index of the correct answer
    }, 
    {
        text: "For radioactive elements, the transformation between a parent and daughter atom involves ",
        options: ["the creation of ionic bonds.", "a release of neutrons and energy.", "an increase in total energy.", "the transformation of chemical energy to potential energy.", "the transformation of heat energy to kinetic energy."],
        answer: 1
    },
    {
        text: "You have installed a solar-charged battery that can provide 4 MJ of electrical energy each day. Approximately how many 50 W bulbs can you run on the battery if each bulb is on for an average of 1 hour per day?",
        options: ["3", "10", "22", "32", "45"],
        answer: 2
    },
    {
        text: "Ocean acidification represents a key component of the ",
        options: ["nitrogen cycle.", "hydrologic cycle.", "phosphorus cycle.", "carbon cycle.", "sulfur cycle."],
        answer: 3
    },
    {
        text: "Which human activity is most likely to decelerate the pace of evolution?",
        options: ["Monocropping corn of the same genotype", "Fragmenting habitat", "Overharvesting fisheries", "Enforcing size limits on hunting", "Connecting lakes through an artificial canal"],
        answer: 0
    },
    {
        text: "What contributes to the physical weathering of rock?",
        options: ["Acid rain", "Burial in sediment", "Volcanic activity", "Growth of plant roots", "Deposition"],
        answer: 3
    },
    {
        text: "Which type of mining is potentially the most harmful to human health?",
        options: ["Open-pit mining", "Mountaintop removal", "Strip mining", "Subsurface mining", "Placer mining"],
        answer: 3
    },
    {
        text: "Which provides protection against the risks that genetically modified crops pose to global crop biodiversity?",
        options: ["No-till agriculture", "Integrated pest management", "Broad-spectrum herbicides", "Use of a pesticide treadmill", "Buffer zones around crops"],
        answer: 4
    },
    {
        text: "Which two nonrenewable energy sources are typically extracted together?",
        options: ["Liquid coal and oil sands", "Petroleum and oil sands", "Petroleum and coal", "Petroleum and natural gas", "Uranium and coal"],
        answer: 3
    },
    {
        text: "Where is denitrification NOT likely to occur?",
        options: ["Topsoil of freshly tilled croplands", "Sediments of a deep lake", "Well-fertilized croplands", "Compacted, wet soils under cattle farms", "Recently flooded cropland"],
        answer: 0
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
