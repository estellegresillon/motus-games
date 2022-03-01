import styled from "styled-components";

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
);

export default Display;

const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px 20px 15px 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 5px;
  background: #171f42;
  color: ${(props) => (props.gameOver ? "#fa6565" : "#c8ddfc")};
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;
