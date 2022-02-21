import { useCallback, useEffect, useState } from "react";

import {
  ACTIONS,
  NERDLE_LINES as WORDLE_LINES,
  WORDLE_CASES,
  WORDLE_KEYS,
} from "utils/constant";
import {
  assignBoardColors,
  assignKeyboardColors,
  getKeyboardColors,
} from "utils/keyColors";
import {
  updateLocalStorageAttempts,
  updateLocalStorageScore,
} from "utils/localStorage";

import Keyboard from "components/common/Keyboard";

import "./Wordle.scss";

const SOLUTION = "amour";

const Wordle = () => {
  const [message, setMessage] = useState("");
  const [hasWon, setHasWon] = useState(null);
  const [line, setLine] = useState(0);
  const [propositions, setPropositions] = useState([]);
  const [misplaced, setMisplaced] = useState([]);
  const [unused, setUnused] = useState([]);
  const [found, setFound] = useState([]);

  const sortKeyStatuses = (word) => {
    if (!word) {
      return;
    }

    const newWord = word.split("");
    const newMisplaced = [...misplaced];
    const newUnused = [...unused];
    const newFound = [...found];

    newWord.forEach((l, i) => {
      const status = getKeyboardColors(l, i, word, SOLUTION);

      switch (status) {
        case "bad-index":
          newMisplaced.push(l);
          return;
        case "found":
          newFound.push(l);
          return;
        case "not-used":
          newUnused.push(l);
          return;
        default:
          return;
      }
    });

    setMisplaced(newMisplaced);
    setUnused(newUnused);
    setFound(newFound);
  };

  const handleBoxNumberChange = useCallback(
    (key) => {
      if (hasWon !== null) {
        return;
      }

      if (key === "Enter" || key === "OK") {
        const proposal = propositions[line];

        if (!proposal) {
          return;
        }

        if (proposal.length < 5) {
          setMessage("Enter a valid word");
          return;
        }

        sortKeyStatuses(proposal);

        if (proposal === SOLUTION) {
          setMessage("Congrats !");
          setLine(line + 1);
          setHasWon(true);

          updateLocalStorageAttempts(proposal);
          updateLocalStorageScore(1);
          return;
        }

        if (line === 5) {
          setMessage("You lose");
          setLine(line + 1);
          setHasWon(false);

          updateLocalStorageAttempts(proposal);
          updateLocalStorageScore(0);
          return;
        }

        setLine(line + 1);
        updateLocalStorageAttempts(proposal);
      }

      if (key === "Backspace" || key === "<=") {
        const newArray = [...propositions];
        let newProposal = newArray[line];

        if (!newProposal || !propositions[line]) {
          return;
        }

        const newWord = newProposal.slice(0, -1);

        if (newArray[line]) {
          newArray.pop();
        }

        newArray.push(newWord);
        setPropositions(newArray);
        setMessage("");
      }

      if (WORDLE_KEYS.includes(key)) {
        const newArray = [...propositions];
        const filteredArray = newArray.filter(Boolean);

        let newProposal = filteredArray[line] || "";

        if (newProposal.length >= 5) {
          return;
        }

        const newWord = (newProposal += key);

        if (filteredArray[line]) {
          filteredArray.pop();
        }

        filteredArray.push(newWord);
        setPropositions(filteredArray);
        setMessage("");
      }
    },
    [hasWon, line, propositions]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const key = e.key;
      handleBoxNumberChange(key);
    },
    [handleBoxNumberChange]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div id="Wordle">
      <h1>Wordle</h1>
      <div className="game-status">{message}</div>
      <div className="playboard-container">
        {WORDLE_LINES.map((_, lineIndex) => (
          <div className="board-line" key={lineIndex}>
            {WORDLE_CASES.map((_, boxIndex) => {
              const currentProposal = propositions[lineIndex]?.split("");
              const boxNumber = currentProposal?.[boxIndex];

              return (
                <div
                  className={`${assignBoardColors(
                    boxNumber,
                    boxIndex,
                    lineIndex,
                    currentProposal,
                    line,
                    SOLUTION
                  )} board-box`}
                  key={boxIndex}
                >
                  {boxNumber}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <Keyboard
        assignColors={(k) => assignKeyboardColors(k, misplaced, unused, found)}
        keyCollections={[WORDLE_KEYS, ACTIONS]}
        onChange={handleBoxNumberChange}
      />
    </div>
  );
};

export default Wordle;
