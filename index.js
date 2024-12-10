var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Function to generate the next sequence in the game
function nextSequence() {
    userClickedPattern = [];
    level++;

    document.querySelector("#level-title").innerText = "Level " + level;

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    var selectedButton = document.querySelector("#" + randomChosenColor);
    selectedButton.style.opacity = 0.5; // Dim the button
    setTimeout(() => (selectedButton.style.opacity = 1), 200); // Restore opacity after 200ms

    playSound(randomChosenColor);
}

// Function to play the sound for a given color
function playSound(audioName) {
    var audio = new Audio("sounds/" + audioName + ".mp3");
    audio.play();
}

// Function to animate a button press
function animatePress(currentColor) {
    var button = document.querySelector("#" + currentColor);
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        setTimeout(() => document.querySelector("body").classList.remove("game-over"), 200);
        document.querySelector("#level-title").innerText = "Game Over! Press Any Key to Restart";
        startOver();
    }
}

// Add event listeners to all buttons
document.querySelectorAll(".btn").forEach(function (button) {
    button.addEventListener("click", function () {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

// Start the game when a key is pressed
document.addEventListener("keydown", function () {
    if (!started) {
        document.querySelector("#level-title").innerText = "Level " + level;
        nextSequence();
        started = true;
    }
});

// Function to reset the game variables
function startOver() {
    level = 0; // Reset level
    gamePattern = [];
    started = false;
}