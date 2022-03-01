import styled from "styled-components";

import Sign from "../Sign";
import { SIGNS } from "../utils";

const PickSign = ({ setSelectedSign }) => (
  <PickSignWrapper>
    {SIGNS.map((sign) => (
      <Sign key={sign} onClick={() => setSelectedSign(sign)} sign={sign} />
    ))}
    <img className="bg-image" src="bg-triangle.svg" alt="" />
  </PickSignWrapper>
);

export default PickSign;

const PickSignWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  height: 50vh;
  position: relative;
  width: 70%;

  .bg-image {
    position: absolute;
    top: 100px;
    z-index: -1;
  }

  .paper {
    left: 0;
    top: 50px;
  }

  .scissors {
    right: 0;
    top: 50px;
  }

  .rock {
    bottom: 0px;
  }
`;
