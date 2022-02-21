import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "assets/styles/base.scss";
// import Home from "components/Home";
import InstantNerdle from "components/InstantNerdle";
import Menu from "components/common/Menu";
import Nerdle from "components/Nerdle";
import Wordle from "components/Wordle";

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Menu />
      <Routes>
        <Route exact path="/" element={<Nerdle />} />
        <Route exact path="/nerdle" element={<Nerdle />} />
        <Route exact path="/instant-nerdle" element={<InstantNerdle />} />
        <Route exact path="/wordle" element={<Wordle />} />
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
