import { Link } from "react-router-dom";

import "./Menu.scss";

const Menu = () => (
  <div id="Menu">
    <div>
      <Link to="/nerdle">Nerdle</Link>
    </div>
    <div>
      <Link to="/instant-nerdle">Instant Nerdle</Link>
    </div>
    <div>
      <Link to="/wordle">Wordle</Link>
    </div>
  </div>
);

export default Menu;
