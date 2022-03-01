export const SIGNS = ["paper", "scissors", "rock"];

export const getResult = (selectedSign, botSign) => {
  if (selectedSign === botSign) {
    return "Tie !";
  }

  if (selectedSign === "paper") {
    return botSign === "rock" ? "You win !" : "You lose !";
  }

  if (selectedSign === "rock") {
    return botSign === "scissors" ? "You win !" : "You lose !";
  }

  if (selectedSign === "scissors") {
    return botSign === "paper" ? "You win !" : "You lose !";
  }
};

export const getScore = (message) => {
  if (message === "You win !") {
    return 1;
  }

  if (message === "You lose !") {
    return -1;
  }

  return 0;
};

export const saveScoreToLocalStorage = (score) => {
  const hasWonCount = localStorage.getItem("rpsScore") || 0;
  localStorage.setItem("rpsScore", parseInt(hasWonCount) + score);
};

export const getScoreFromLocalStorage = () => {
  return localStorage.getItem("rpsScore") || 0;
};
