import { useCallback, useEffect, useState } from "react";

import {
  ACTIONS,
  NERDLE_KEYS,
  NERDLE_LINES,
  NERDLE_CASES,
  OPERATORS,
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

import "./Nerdle.scss";

const SOLUTION = "89*3=267";

const Nerdle = () => {
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

        if (proposal === SOLUTION) {
          sortKeyStatuses(proposal);

          setMessage("Congrats !");
          setLine(line + 1);
          setHasWon(true);

          updateLocalStorageAttempts(proposal);
          updateLocalStorageScore(1);
          return;
        }

        const operation = proposal.split("=");

        if (operation.length > 2) {
          setMessage("Enter a possible computation");
          return;
        }

        try {
          if (eval(operation[0]) !== parseInt(operation[1])) {
            setMessage("Enter a possible computation");
          } else {
            sortKeyStatuses(proposal);

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
        } catch {
          setMessage("Enter a possible computation");
        }
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

      if (NERDLE_KEYS.includes(key) || OPERATORS.includes(key)) {
        const newArray = [...propositions];
        const filteredArray = newArray.filter(Boolean);

        let newProposal = filteredArray[line] || "";

        if (newProposal.length >= 8) {
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
    <div id="Nerdle">
      <h1>Nerdle</h1>
      <div className="game-status">{message}</div>
      <div className="playboard-container">
        {NERDLE_LINES.map((_, lineIndex) => (
          <div className="board-line" key={lineIndex}>
            {NERDLE_CASES.map((_, boxIndex) => {
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
        keyCollections={[NERDLE_KEYS, OPERATORS, ACTIONS]}
        onChange={handleBoxNumberChange}
      />
    </div>
  );
};

export default Nerdle;
