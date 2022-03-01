import { useState } from "react";
import styled from "styled-components";

import Header from "./Header";
import PickSign from "./PickSign";
import Result from "./Result";
import { getResult, getScore, saveScoreToLocalStorage, SIGNS } from "./utils";

const RockPaperScissors = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [botSign, setBotSign] = useState(null);
  const [result, setResult] = useState("");

  const restartGame = () => {
    const score = getScore(result);
    saveScoreToLocalStorage(score);

    setResult("");
    setSelectedSign(null);
    setBotSign(null);
  };

  const onSelectSign = (sign) => {
    setSelectedSign(sign);

    const randomBotSign = SIGNS[Math.floor(Math.random() * SIGNS.length)];
    setBotSign(randomBotSign);

    const messageResult = getResult(sign, randomBotSign);
    setResult(messageResult);
  };

  return (
    <RockPaperScissorsWrapper>
      <Header />
      {selectedSign && botSign ? (
        <Result
          botSign={botSign}
          onClick={restartGame}
          result={result}
          selectedSign={selectedSign}
        />
      ) : (
        <PickSign setSelectedSign={onSelectSign} />
      )}
    </RockPaperScissorsWrapper>
  );
};

export default RockPaperScissors;

const RockPaperScissorsWrapper = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: 60vw;
`;
