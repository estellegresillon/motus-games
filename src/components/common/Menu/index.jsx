import { useState } from "react";
import styled from "styled-components";

import GamesModal from "components/common/GamesModal";
import ProjectsModal from "components/common/ProjectsModal";

import "./Menu.scss";

const Menu = () => {
  const [isGamesOpen, setGamesOpen] = useState(false);
  const [isOtherProjectsOpen, setOtherProjectsOpen] = useState(false);

  const handleGamesOpen = (boolean) => {
    setGamesOpen(boolean);

    if (boolean) {
      setOtherProjectsOpen(false);
    }
  };

  const handleOtherProjectsOpen = (boolean) => {
    setOtherProjectsOpen(boolean);

    if (boolean) {
      setGamesOpen(false);
    }
  };

  return (
    <div id="Menu">
      <Item>
        <ItemContent onClick={() => handleGamesOpen(true)}>Games</ItemContent>
        {isGamesOpen && <GamesModal onClose={() => handleGamesOpen(false)} />}
      </Item>
      <Item>
        <ItemContent onClick={() => handleOtherProjectsOpen(true)}>
          Other projects
        </ItemContent>
        {isOtherProjectsOpen && (
          <ProjectsModal onClose={() => handleOtherProjectsOpen(false)} />
        )}
      </Item>
    </div>
  );
};

export default Menu;

const Item = styled.div`
  border-radius: 10px;
  cursor: pointer;
  height: 50px;
  margin: 10px 20px;
  position: relative;
  text-align: center;
  width: calc(100% - 40px);
`;

const ItemContent = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  white-space: nowrap;
  width: 100%;
`;
