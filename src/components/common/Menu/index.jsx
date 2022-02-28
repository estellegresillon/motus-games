import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import ProjectsModal from "components/common/ProjectsModal";

import "./Menu.scss";

const Menu = () => {
  const [isOtherProjectsOpen, setOtherProjectsOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  return (
    <div id="Menu">
      <div className={pathname === "/nerdle" ? "is-selected" : ""}>
        <Link to="/nerdle">Nerdle</Link>
      </div>
      <div className={pathname === "/instant-nerdle" ? "is-selected" : ""}>
        <Link to="/instant-nerdle">Instant Nerdle</Link>
      </div>
      <div
        className={
          pathname === "/" || pathname === "/wordle" ? "is-selected" : ""
        }
      >
        <Link to="/wordle">Wordle</Link>
      </div>
      <Item>
        <ItemContent onClick={() => setOtherProjectsOpen(true)}>
          Other projects
        </ItemContent>
        {isOtherProjectsOpen && (
          <ProjectsModal onClose={() => setOtherProjectsOpen(false)} />
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
