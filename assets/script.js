//Code for global variables for script.
var startButton = document.getElementById("start");
var timeHolder = document.getElementById("timeHolder");
var instructions = document.getElementById("instructions");
var quizHeader = document.getElementById("quizHeader");
var quizInstructions = document.getElementById("quizInstructions");
var timerDisplay = document.getElementById("timer");
var initials = document.getElementById("initialsInput");
var label = document.getElementById("initialsLabel");
var submitButton = document.getElementById("submitButton");
var game = document.getElementById("game");
var question = document.getElementById("question");
var options = document.getElementById("options");
var timeLeft = 150;
var downloadTimer;
var index = 0;
var numCorrect = 0;

//Code for questions array containing the objects for each question.
var questionsArray = [{
        question: "1. What is the main programming language used to make interactive web pages?",
        choices: ["a. python", "b. java", "c. C++", "d. Javascript"],
        answer: "d. Javascript"
    },
    {
        question: "2. What syntax is used for single-line commenting in javascript?",
        choices: ["a. ::", "b. //", "c. ||", "d. .."],
        answer: "b. //"
    },
    {
        question: "3. Which of the following languages is not one of the main three used for basic web development?",
        choices: ["a. Javascript", "b. C#", "c. CSS", "d. HTML"],
        answer: "b. C#"
    },
    {
        question: "4. What is the correct way to externally link a .js file to an HTML file?",
        choices: ["a. <script src='script.js'>", "b. <script href='script.js'>", "c. <link href='script.js'>", "d. <link src='script.js'"],
        answer: "a. <script src='script.js'>"
    },
    {
        question: "5. What syntax is used directly after a built in  Javascript method?",
        choices: ["a. []", "b. {}", "c. **", "d. ()"],
        answer: "d. ()"
    },
    {
        question: "6. What does API stand for?",
        choices: ["a. artificial programing intercom", "b. accessible programming interface", "c. application programming interface", "d. assigned programming interface"],
        answer: "c. application programming interface"
    },
    {
        question: "7. What type of equality operator is used for a strict equality (type and value)?",
        choices: ["a. =", "b. ==", "c. ===", "d. +=="],
        answer: "c. ==="
    },
    {
        question: "8. What library is commonly used alongside CSS?",
        choices: ["a. bootstrap", "b. jquery", "c. w3schools", "d. MDN"],
        answer: "a. bootstrap"
    },
    {
        question: "9. Boolean statements will return this type of value...",
        choices: ["a. yes/no", "b. true/false", "c. num/var", "d. =/!="],
        answer: "b. true/false"
    },
    {
        question: "10. What type of loop gets executed as long as a condition is true?",
        choices: ["a. for", "b. do", "c. while", "d. break"],
        answer: "a. for"
    },
];


//Code for the start button that begins the quiz and hides the instructions.
startButton.addEventListener("click", function () {
    startButton.classList.add("hide");
    timeHolder.classList.remove("hide");
    quizInstructions.classList.add("hide");
    downloadTimer = setInterval(countDown, 1000);
    newQuestion();

});


//Code for the timer functionality and display. Counts down every second until 0.
function countDown() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        timeLeft = 0;
        timerDisplay.textContent = timeLeft;
        clearInterval(downloadTimer);
        endQuiz();
    }
}


//Code for the end of the quiz. Shows an input so the user can enter their initials to record their score.
function endQuiz() {
    game.classList.add("hide");
    timeHolder.classList.add("hide");
    quizInstructions.classList.remove("hide");
    quizHeader.textContent = "All Done!";
    quizInstructions.textContent = "Your final score was " + numCorrect + "!";
    initials.classList.remove("hide");
    label.classList.remove("hide");
    submitButton.classList.remove("hide");
    submitButton.onclick = showHighScores;

}

//Code for displaying the high scores. This uses local storage to get the list of previous scores and displays them on the High Score page along with the current score.
function showHighScores() {
    this.classList.add("hide");
    initials.classList.add("hide");
    label.classList.add("hide");
    quizInstructions.classList.add("hide");
    quizHeader.textContent = "High Scores";
    var currentScore = {
        userInitials: initials.value,
        userScore: numCorrect
    };

    // Code used to access local storage and track the high scores.
    var savedScores = localStorage.getItem('highscore') || '[]';
    var listOfScores = [...JSON.parse(savedScores), currentScore];
    listOfScores.sort((a, b) => b.userScore - a.userScore);
    localStorage.setItem('highscore', JSON.stringify(listOfScores));
    var scoreList = document.createElement("ol");
    instructions.appendChild(scoreList);
    for (var i = 0; i < listOfScores.length; i++) {
        var listElement = document.createElement("li");
        listElement.setAttribute("class", "listElement");
        listElement.textContent = listOfScores[i].userScore + "-----" + listOfScores[i].userInitials;
        scoreList.appendChild(listElement);
    }
}


//Code for the question generator that goes to the next question in the array after the current question is answered.
function newQuestion() {
    var currentQuestion = questionsArray[index];
    question.textContent = currentQuestion.question;
    options.innerHTML = "";
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("class", "btn");
        button.setAttribute("value", currentQuestion.choices[i]);
        button.textContent = currentQuestion.choices[i];
        button.onclick = verify;
        options.appendChild(button);
    }
}


//Verifies the answers inputed by the user for each question inside the console. If it matches then it is marked correct. If it does not match, then it is marked incorrect. Calls the end quiz function if there are no remaining questions.
function verify() {
    var buttonValue = this.value;
    var answer = questionsArray[index].answer;
    if (buttonValue === answer) {
        numCorrect++;
    } else {
        timeLeft -= 5;
    }
    index++;
    if (index === questionsArray.length) {

        clearInterval(downloadTimer);
        endQuiz();
    } else {
        newQuestion();
    }
}