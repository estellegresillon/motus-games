import styled from "styled-components";

const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);

export default StartButton;

const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px 20px 15px 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 5px;
  border: none;
  color: white;
  background: #6ad084;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;
