var startButton = document.getElementById("start");
var timeHolder = document.getElementById("timeHolder");
var instructions = document.getElementById("instructions");
var quizHeader = document.getElementById("quizHeader");
var quizInstructions = document.getElementById("quizInstructions");


startButton.addEventListener("click", function () {
    startButton.classList.add("hide");
    timeHolder.classList.remove("hide");
    quizInstructions.classList.add("hide");

});