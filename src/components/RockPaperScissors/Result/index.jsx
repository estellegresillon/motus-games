import styled from "styled-components";

import Sign from "../Sign";

const Result = ({ selectedSign, botSign, onClick, result }) => (
  <ResultWrapper>
    <Sign sign={selectedSign} />
    <Sign sign={botSign} />
    <ScoreWrapper>
      <div className="game-result">{result}</div>
      <div className="play-again" onClick={onClick}>
        Play Again
      </div>
    </ScoreWrapper>
  </ResultWrapper>
);

export default Result;

const ResultWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  height: 50vh;
  position: relative;
  width: 70%;

  .sign-bg {
    top: 50px;
    right: 0;
  }

  .sign-bg:first-child {
    top: 50px;
    left: 0;
  }
`;

const ScoreWrapper = styled.div`
  bottom: 100px;
  position: absolute;
  text-align: center;

  .play-again {
    background: white;
    border-radius: 5px;
    color: #13163c;
    cursor: pointer;
    margin-top: 20px;
    padding: 10px 15px;
  }
`;
