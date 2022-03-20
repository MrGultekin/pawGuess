"use strict";

// Speech Recognition
const msgEl = document.getElementById("msg");

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

// window.SpeechRecognition =
//   window.webkitSpeechRecognition ||
//   window.mozSpeechRecognition ||
//   window.msSpeechRecognition ||
//   window.oSpeechRecognition ||
//   window.SpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const voiceMsg = e.results[0][0].transcript;
  console.log(voiceMsg);
  writeMessage(voiceMsg);
  checkNumber(voiceMsg);
}

// Write what user speaks
function writeMessage(voiceMsg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${voiceMsg}</span>
  `;
}

// Check msg against number
function checkNumber(voiceMsg) {
  const num = +voiceMsg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML = "<div>That is not a valid number</div>";
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }

  // Check number
  if (num === secretNumber) {
    document.body.innerHTML = `
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
      `;
  } else if (num > secretNumber) {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  }
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
let secretNumber = Math.trunc(Math.random() * 2) + 1;
console.log(secretNumber);

let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

// document.querySelector(".check").addEventListener("click", function () {
//   const guess = Number(document.querySelector(".guess").value);
//   console.log(guess, typeof guess);

//   // When there is no input
//   if (!guess) {
//     // document.querySelector('.message').textContent = '⛔️ No number!';
//     displayMessage("⛔️ No number!");

//     // When player wins
//   } else if (guess === secretNumber) {
//     // document.querySelector('.message').textContent = '🎉 Correct Number!';
//     displayMessage("🎉 Correct Number!");
//     document.querySelector(".number").textContent = secretNumber;

//     document.querySelector("body").style.backgroundColor = "#60b347";
//     document.querySelector(".number").style.width = "30rem";

//     if (score > highscore) {
//       highscore = score;
//       document.querySelector(".highscore").textContent = highscore;
//     }

//     // When guess is wrong
//   } else if (guess !== secretNumber) {
//     if (score > 1) {
//       // document.querySelector('.message').textContent =
//       // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
//       displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
//       score--;
//       document.querySelector(".score").textContent = score;
//     } else {
//       // document.querySelector('.message').textContent = '💥 You lost the game!';
//       displayMessage("💥 You lost the game!");
//       document.querySelector(".score").textContent = 0;
//     }
//   }

//   //   // When guess is too high
//   // } else if (guess > secretNumber) {
//   //   if (score > 1) {
//   //     document.querySelector('.message').textContent = '📈 Too high!';
//   //     score--;
//   //     document.querySelector('.score').textContent = score;
//   //   } else {
//   //     document.querySelector('.message').textContent = '💥 You lost the game!';
//   //     document.querySelector('.score').textContent = 0;
//   //   }

//   //   // When guess is too low
//   // } else if (guess < secretNumber) {
//   //   if (score > 1) {
//   //     document.querySelector('.message').textContent = '📉 Too low!';
//   //     score--;
//   //     document.querySelector('.score').textContent = score;
//   //   } else {
//   //     document.querySelector('.message').textContent = '💥 You lost the game!';
//   //     document.querySelector('.score').textContent = 0;
//   //   }
//   // }
// });

// document.querySelector(".again").addEventListener("click", function () {
//   score = 20;
//   secretNumber = Math.trunc(Math.random() * 20) + 1;

//   // document.querySelector('.message').textContent = 'Start guessing...';
//   displayMessage("Start guessing...");
//   document.querySelector(".score").textContent = score;
//   document.querySelector(".number").textContent = "?";
//   document.querySelector(".guess").value = "";

//   document.querySelector("body").style.backgroundColor = "#222";
//   document.querySelector(".number").style.width = "15rem";
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/
