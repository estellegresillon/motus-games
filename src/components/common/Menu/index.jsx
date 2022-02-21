import { Link, useLocation } from "react-router-dom";

import "./Menu.scss";

const Menu = () => {
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
    </div>
  );
};

export default Menu;
