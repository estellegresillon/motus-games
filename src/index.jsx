import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "assets/styles/base.scss";
import "assets/styles/common.scss";

import Menu from "components/common/Menu";
import Wordle from "components/Wordle";
import { GAMES } from "utils/constant";

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Menu />
      <Routes>
        <Route exact path="/" element={<Wordle />} />
        {GAMES.map((game) => (
          <Route
            exact
            key={game.name}
            path={game.link}
            element={game.component}
          />
        ))}
      </Routes>
    </React.Fragment>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
