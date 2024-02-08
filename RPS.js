const choices = document.querySelectorAll(".choice");
const playerScoreElem = document.querySelector(".playerScore");
const computerScoreElem = document.querySelector(".compScore");
const resultElem = document.querySelector("#result");
const compChoice = document.querySelector(".compChoice");
const playAgainBt = document.querySelector("#reset");
const countDownElem = document.querySelector("#countdown");

const moves = ["rock", "paper", "scissors"];
let playerScore = 0;
let compScore = 0;
let countDown = 10;
let timeout;

function compChoiceSel() {
  const index = Math.floor(Math.random() * moves.length);
  return moves[index];
}

function updateScore(playerMove, compMove) {
  console.log("score updated");
  clearTimeout(timeout);
  if (playerMove) {
    compChoice.innerHTML = `Computer Chose:${compMove}.`;
    if (playerMove === compMove) {
      resultElem.innerHTML = `Draw!`;
    } else if (
      (playerMove === "rock" && compMove === "scissors") ||
      (playerMove === "paper" && compMove === "rock") ||
      (playerMove === "scissors" && compMove === "paper" && compMove === "rock")
    ) {
      resultElem.innerHTML = `You Win!`;
      playerScore++;
      playerScoreElem.innerHTML = `${playerScore}`;
    } else {
      resultElem.innerHTML = `You Lose!`;
      compScore++;
      computerScoreElem.innerHTML = `${compScore}`;
    }
    startTimer();
  } else {
    compChoice.innerHTML = `Game Over`;
    resultElem.innerHTML = `You failed to make a choice and lost the game `;
    resultElem.computedStyleMap.color = "red";
    disableOptions();
  }
  if (playerScore === 5) {
    resultElem.textContent = `You won the game!!`;
    resultElem.style.Color = "green";
    compChoice.innerHTML = `Game Over`;
  } else if (compScore === 5) {
    resultElem.textContent = `You lost the game!!`;
    resultElem.style.Color = "red";
    compChoice.innerHTML = `Game Over`;
    disableOptions();
    stopTimer();
  }
}
function selectMove() {
  console.log("move selected");
  clearTimeout(timeout);
  countDownElem.innerHTML = `10`;
  countDown = 10;
  const playerMove = this.id;
  const compMove = compChoiceSel();
  updateScore(playerMove, compMove);
}
function startTimer() {
  countDown--;
  countDownElem.innerHTML = countDown;
  if (countDown == 0) {
    const compChoice = compChoiceSel();
  } else {
    timeout = setTimeout(startTimer, 1000);
  }
}
function stopTimer() {
  clearTimeout(timeout);
  countDownElem.innerHTML = `10`;
  countDownElem.textContent = countDown;
}
function resetGame() {
  playerScore = 0;
  compScore = 0;
  playerScoreElem.innerHTML = `Player: 0`;
  computerScoreElem.innerHTML = `Computer: 0`;
  resultElem.innerHTML = `Choose Your Move`;
  countDownElem.innerHTML = "10";
  compChoice.innerHTML = "";
  EnableOptions();
  startTimer();
}
function disableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvent = "none";
  });
}
function EnableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvent = "auto";
  });
}
choices.forEach((choice) => choice.addEventListener("click", selectMove));
playAgainBt.addEventListener("click", resetGame); //
countDownElem.innerHTML = countDown;
timeout = setTimeout(startTimer, 1000);
