export const updateLocalStorageAttempts = (proposal) => {
  const attempts = JSON.parse(localStorage.getItem("attempts")) || [];
  attempts.push(proposal);
  localStorage.setItem("attempts", JSON.stringify(attempts));
};

export const updateLocalStorageScore = (score) => {
  const hasWonCount = localStorage.getItem("winCount") || 0;
  localStorage.setItem("winCount", parseInt(hasWonCount) + score);

  const gamesPlayedCount = localStorage.getItem("gamesPlayed") || 0;
  localStorage.setItem("gamesPlayed", parseInt(gamesPlayedCount) + 1);
};
