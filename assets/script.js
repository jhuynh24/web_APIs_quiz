var startButton = document.getElementById("start");
var timeHolder = document.getElementById("timeHolder");
var instructions = document.getElementById("instructions");
var quizHeader = document.getElementById("quizHeader");
var quizInstructions = document.getElementById("quizInstructions");
var timerDisplay = document.getElementById("timer");
var timeLeft = 150;
var downloadTimer;
var index = 0;
var numCorrect = 0;
var game = document.getElementById("game");
var question = document.getElementById("question");
var options = document.getElementById("options");

startButton.addEventListener("click", function () {
    startButton.classList.add("hide");
    timeHolder.classList.remove("hide");
    quizInstructions.classList.add("hide");
    downloadTimer = setInterval(countDown, 1000);
    newQuestion();
});

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