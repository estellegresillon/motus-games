export const assignBoardColors = (
  boxNumber,
  boxIndex,
  boardLineIndex,
  currentProposal,
  currentLineIndex,
  solution
) => {
  if (!boxNumber || boardLineIndex === currentLineIndex) {
    return "";
  }

  if (solution.includes(boxNumber)) {
    if (solution[boxIndex] === boxNumber) {
      return "found";
    } else {
      let occurencesInSolution = 0;
      let previousOccurences = 0;

      solution
        .split("")
        .filter((letter) =>
          letter === boxNumber ? occurencesInSolution++ : false
        );

      currentProposal
        .slice(0, boxIndex)
        .filter((letter) =>
          letter === boxNumber ? previousOccurences++ : false
        );

      if (previousOccurences < occurencesInSolution) {
        return "bad-index";
      } else return "not-used";
    }
  }

  return "not-used";
};

export const assignKeyboardColors = (key, misplaced, unused, found) => {
  if (found.includes(key)) {
    return "found";
  }
  if (unused.includes(key)) {
    return "not-used";
  }
  if (misplaced.includes(key)) {
    return "bad-index";
  }

  return "";
};

export const getKeyboardColors = (
  boxNumber,
  boxIndex,
  currentProposal,
  solution
) => {
  if (solution.includes(boxNumber)) {
    if (solution[boxIndex] === boxNumber) {
      return "found";
    } else {
      let occurencesInSolution = 0;
      let previousOccurences = 0;

      solution
        .split("")
        .filter((letter) =>
          letter === boxNumber ? occurencesInSolution++ : false
        );

      currentProposal
        .split("")
        .slice(0, boxIndex)
        .filter((letter) =>
          letter === boxNumber ? previousOccurences++ : false
        );

      if (previousOccurences < occurencesInSolution) {
        return "bad-index";
      } else return "not-used";
    }
  }

  return "not-used";
};
