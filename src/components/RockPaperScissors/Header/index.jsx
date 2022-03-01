import styled from "styled-components";

import { getScoreFromLocalStorage } from "../utils";

const Header = () => {
  const score = getScoreFromLocalStorage();

  return (
    <HeaderWrapper>
      <h2>ROCK PAPER SCISSORS</h2>
      <div className="score">
        <div>SCORE</div>
        <div className="score-count">{score}</div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  border: 2px solid #606e85;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
  padding: 0 40px;
  width: calc(100% - 84px);

  .score {
    background: white;
    border-radius: 5px;
    color: #14163b;
    font-size: 12px;
    margin-right: -20px;
    padding: 20px 24px;
    text-align: center;

    .score-count {
      font-size: 20px;
    }
  }
`;
