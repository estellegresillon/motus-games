import { useState } from "react";
import styled from "styled-components";

import IconCross from "./IconCross";
import { CELLS, WINNING_COMBINATIONS } from "./utils";

const TicTacToe = () => {
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [playerOneHasWon, setPlayerOneHasWon] = useState(false);
  const [playerTwoHasWon, setPlayerTwoHasWon] = useState(false);
  const [tie, setTie] = useState(false);
  const [cells, setCells] = useState(CELLS);
  const [playerOneGame, setPlayerOneGame] = useState([]);
  const [playerTwoGame, setPlayerTwoGame] = useState([]);

  const handleCellClick = (index) => {
    if (isPlayerOneTurn) {
      const move = [...playerOneGame, index];
      setPlayerOneGame(move);
      checkHasWon(move, "one");

      const newCells = [...cells];
      newCells[index] = "X";
      setCells(newCells);
    }

    if (!isPlayerOneTurn) {
      const move = [...playerTwoGame, index];
      setPlayerTwoGame(move);
      checkHasWon(move, "two");

      const newCells = [...cells];
      newCells[index] = "O";
      setCells(newCells);
    }

    const tie = playerOneGame.length + playerTwoGame.length === 8;

    if (tie) {
      setTie(true);
      return;
    }

    setIsPlayerOneTurn(!isPlayerOneTurn);
  };

  const restartGame = () => {
    setIsPlayerOneTurn(true);
    setPlayerOneHasWon(false);
    setPlayerTwoHasWon(false);
    setTie(false);
    setPlayerOneGame([]);
    setPlayerTwoGame([]);
    setCells(CELLS);
  };

  const checkHasWon = (move, player) => {
    WINNING_COMBINATIONS.forEach((combination) => {
      const hasWon = combination.every((a) => move.includes(a));
      if (hasWon) {
        player === "one" ? setPlayerOneHasWon(true) : setPlayerTwoHasWon(true);
      }
    });
  };

  return (
    <TicTacToeWrapper>
      <CellsWrapper>
        {cells.map((cell, index) => (
          <Cell key={index} onClick={() => handleCellClick(index)}>
            {cell === "X" && <IconCross />}
            {cell === "O" && "O"}
          </Cell>
        ))}
      </CellsWrapper>
      <StatusWrapper>
        <div>
          {playerOneHasWon && "Player one has won !"}
          {playerTwoHasWon && "Player two has won !"}
          {tie && !playerOneHasWon && !playerOneHasWon && "Tie :("}
        </div>
        {(playerOneHasWon || playerTwoHasWon || tie) && (
          <div className="restart-button" onClick={() => restartGame()}>
            Play again
          </div>
        )}
      </StatusWrapper>
    </TicTacToeWrapper>
  );
};

export default TicTacToe;

const TicTacToeWrapper = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const CellsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 450px;
  width: 450px;
`;

const Cell = styled.div`
  align-items: center;
  color: #93dcff;
  cursor: pointer;
  display: flex;
  font-size: 72px;
  height: 150px;
  justify-content: center;
  width: 146px;

  svg {
    color: #ffa04c;
    height: 50px;
    width: 50px;
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(4),
  &:nth-child(5),
  &:nth-child(7),
  &:nth-child(8) {
    border-right: 4px solid #14163a;
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5),
  &:nth-child(6) {
    border-bottom: 4px solid #14163a;
  }
`;

const StatusWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 15vh;
  justify-content: space-between;
  width: 400px;

  .restart-button {
    background-color: white;
    border-radius: 5px;
    color: #14163a;
    cursor: pointer;
    padding: 10px 15px;

    &:hover {
      background-color: #d3deea;
    }
  }
`;
