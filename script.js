const btn = document.querySelectorAll(".rps-btn");
const reset = document.getElementById("rps-reset-btn");

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const pickComputerMove = () => {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "scissors";
  }
  return computerMove;
};

const updateScoreElement = () => {
  document.querySelector(
    "#rps-score"
  ).innerHTML = `wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

const playGame = (playerMove) => {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === 2) {
    if (computerMove === "rock") {
      result = "you lose.";
    } else if (computerMove === "paper") {
      result = " you win.";
    } else if (computerMove === "scissors") {
      result = "tie.";
    }
  } else if (playerMove === 1) {
    if (computerMove === "rock") {
      result = "you win.";
    } else if (computerMove === "paper") {
      result = " tie.";
    } else if (computerMove === "scissors") {
      result = "you lose.";
    }
  } else if (playerMove === 0) {
    if (computerMove === "rock") {
      result = "tie.";
    } else if (computerMove === "paper") {
      result = "you lose.";
    } else if (computerMove === "scissors") {
      result = "you win.";
    }
  }

  if (result === "you win.") {
    score.wins++;
  } else if (result === "you lose.") {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector("#rps-result").innerHTML = result;
  document.querySelector(
    "#rps-moves"
  ).innerHTML = `You <img class="rps-result-img" src= "images/${playerMove}-emoji.png"> <img class="rps-result-img" src= "images/${computerMove}-emoji.png"> Computer`;
};

const resetGame = () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
};

btn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    playGame(index);
  });
});

// make the index === string

reset.addEventListener("click", resetGame);
