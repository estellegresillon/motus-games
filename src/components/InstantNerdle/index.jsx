import { useCallback, useEffect, useState } from "react";

import { ACTIONS, NERDLE_KEYS, NERDLE_CASES, OPERATORS } from "utils/constant";
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

import "./InstantNerdle.scss";

const SOLUTION = "5*7+8=43";
const HINT = "84*+=735";

const InstantNerdle = () => {
  const [message, setMessage] = useState("");
  const [hasWon, setHasWon] = useState(null);
  const [line, setLine] = useState(0);
  const [proposition, setProposition] = useState("");
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
        if (proposition.length === 0) {
          return;
        }

        if (proposition === SOLUTION) {
          sortKeyStatuses(proposition);
          setMessage("Congrats !");
          setLine(line + 1);
          setHasWon(true);

          updateLocalStorageAttempts(proposition);
          updateLocalStorageScore(1);
          return;
        }

        const operation = proposition.split("=");

        if (operation.length > 2) {
          setMessage("Enter a possible computation");
          return;
        }

        try {
          if (eval(operation[0]) !== parseInt(operation[1])) {
            setMessage("Enter a possible computation");
          } else {
            sortKeyStatuses(proposition);
            setMessage("You lose");
            setLine(line + 1);
            setHasWon(false);

            updateLocalStorageAttempts(proposition);
            updateLocalStorageScore(0);
            return;
          }
        } catch {
          setMessage("Enter a possible computation");
        }
      }

      if (key === "Backspace" || key === "<=") {
        if (!proposition) {
          return;
        }

        const newProposition = proposition.slice(0, -1);
        setProposition(newProposition);
        setMessage("");
      }

      if (NERDLE_KEYS.includes(key) || OPERATORS.includes(key)) {
        const newProposition = proposition + key;

        if (newProposition.length === 9) {
          return;
        }
        setProposition(newProposition);
        setMessage("");
      }
    },
    [hasWon, line, proposition]
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

  useEffect(() => {
    sortKeyStatuses(HINT);
  }, []);

  return (
    <div id="InstantNerdle">
      <h1>Instant Nerdle</h1>
      <div className="game-status">{message}</div>
      <div className="playboard-container">
        <div className="board-line">
          {HINT.split("").map((boxNumber, boxIndex) => (
            <div
              className={`${assignBoardColors(
                boxNumber,
                boxIndex,
                0,
                HINT.split(""),
                -1,
                SOLUTION
              )} board-box`}
              key={boxIndex}
            >
              {boxNumber}
            </div>
          ))}
        </div>
        <div className="board-line">
          {NERDLE_CASES.map((_, boxIndex) => {
            const boxNumber = proposition?.[boxIndex];

            return (
              <div
                className={`${assignBoardColors(
                  boxNumber,
                  boxIndex,
                  0,
                  proposition.split(""),
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
      </div>

      <Keyboard
        assignColors={(k) => assignKeyboardColors(k, misplaced, unused, found)}
        keyCollections={[NERDLE_KEYS, OPERATORS, ACTIONS]}
        onChange={handleBoxNumberChange}
      />
    </div>
  );
};

export default InstantNerdle;
