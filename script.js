"use strict";
const msgEl = document.getElementById("msg");
const articleEl = document.getElementById("article");
const numberEl = document.querySelector(".number");
const containerEl = document.querySelector(".container");
const leftEl = document.querySelector(".left");
const btnAgainManualEl = document.querySelector(".manual-btn");
const voiceBtn = document.querySelector(".btn-voice");
const manualBtn = document.querySelector(".btn-manual");
const btnContainer = document.querySelector("#btn-container");
const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".highScore");
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
let score = 20;
let highScore = 0;
let num;

// window.SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// Speech Recognition
window.SpeechRecognition =
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition ||
  window.oSpeechRecognition ||
  window.SpeechRecognition;

let recognition = new window.SpeechRecognition();

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
    <div class="user-speech">You said: </div>
    <span class="box">${voiceMsg}</span>
  `;
}

// Check msg against number
function checkNumber(voiceMsg) {
  num = +voiceMsg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML = "<div>That is not a valid number</div>";
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML +=
      "<div class='alert-box'>Number must be between 1 and 20</div>";
    return;
  }

  // Check number
  if (num === secretNumber) {
    document.body.style.backgroundColor = "#60b347";
    numberEl.innerHTML = `${num}`;
    numberEl.style.width = "30rem";
    articleEl.innerHTML = `
        <h2 class="congrats">Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again btn" id="play-again">Play Again</button>
      `;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highScore").textContent = highScore;
      localStorage.setItem("highScoreValue", highScore);
    }
  } else if (num !== secretNumber) {
    if (score > 1) {
      if (num > secretNumber) {
        msgEl.innerHTML += "<div class='alert-box'> GO LOWER </div>";
      }
      score--;
      scoreEl.textContent = score;
    }
  } else {
    if (score > 1) {
      if (num < secretNumber) {
        msgEl.innerHTML += "<div class='alert-box'> GO HIGHER </div>";
      }
      score--;
      scoreEl.textContent = score;
    }
  }
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

voiceBtn.addEventListener("click", () => {
  // Start recognition and game
  recognition.start();

  containerEl.style.display = "flex";
  articleEl.style.display = "flex";
  btnContainer.style.display = "none";
  leftEl.style.display = "none";
});

manualBtn.addEventListener("click", () => {
  containerEl.style.display = "flex";
  btnContainer.style.display = "none";
});

const guessEl = document.querySelector(".guess");
guessEl.addEventListener("keyup", myFunction);

const checkEl = document.querySelector(".check");
checkEl.addEventListener("click", myFunction);

// 4 LocalStorage

const localStorageFunction = () => {
  const myLocalStorage = localStorage.getItem("highScoreValue");
  if (myLocalStorage) {
    highScoreEl.innerHTML = myLocalStorage;
  }
};
localStorageFunction();
// const myLocalStorage = localStorage.getItem('highScoreValue');
// if (myLocalStorage){
//   highScoreEl.innerHTML = myLocalStorage;
// }

function myFunction(event) {
  if (event.key === "Enter" || event.target.className === "btn check") {
    console.log(event);

    const guess = Number(document.querySelector(".guess").value);
    // const guess = document.querySelector(".guess").value;

    console.log(guess, typeof guess);

    // When there is no input
    if (!guess) {
      // document.querySelector('.message').textContent = '⛔️ No number!';
      displayMessage("⛔️ No number!");

      // When player wins
    } else if (guess === secretNumber) {
      // document.querySelector('.message').textContent = '🎉 Correct Number!';
      console.log("you won");
      displayMessage("🎉 Correct Number!");
      document.querySelector(".number").textContent = secretNumber;
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";

      checkEl.style.display = "none";
      btnAgainManualEl.style.display = "initial";
      btnAgainManualEl.addEventListener("click", () => {
        console.log("Top again btn clicked");
        window.location.reload();
      });

      if (score > highScore) {
        highScore = score;

        highScoreEl.textContent = highScore;
        // 4 Local Storage starts
        localStorage.setItem("highScoreValue", highScore);
        // highScore.innerHTML = localStorage.getItem('highScoreValue');
        // 4 Local Storage ends
      }

      // When guess is wrong
    } else if (guess !== secretNumber) {
      if (score > 1) {
        displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
        score--;
        scoreEl.textContent = score;
      } else {
        // document.querySelector('.message').textContent = '💥 You lost the game!';
        displayMessage("💥 You lost the game!");
        scoreEl.textContent = "";

        checkEl.style.display = "none";
        btnAgainManualEl.style.display = "initial";
        btnAgainManualEl.addEventListener("click", () => {
          console.log("Top again btn clicked");
          window.location.reload();
        });
      }
    }
  }
}
