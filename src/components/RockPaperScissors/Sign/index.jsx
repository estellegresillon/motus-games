import styled from "styled-components";

const Sign = ({ sign, onClick }) => (
  <SignWrapper className={`sign-bg ${sign}`} onClick={onClick}>
    <div className="sign-wrapper">
      <img src={`icon-${sign}.svg`} alt={sign} />
    </div>
  </SignWrapper>
);

export default Sign;

const SignWrapper = styled.div`
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: 160px;
  justify-content: center;
  position: absolute;
  width: 160px;

  .sign-wrapper {
    align-items: center;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    height: 120px;
    width: 120px;
  }

  &.paper {
    background: linear-gradient(#6e85fa 0%, #415de9 100%);
  }

  &.scissors {
    background: linear-gradient(#ffda95 0%, #eca922 100%);
  }

  &.rock {
    background: linear-gradient(#f87f95 0%, #dd405d 100%);
  }
`;
