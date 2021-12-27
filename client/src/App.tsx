import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Globalstyle} from "./styles/GlobalStyle";
import IntroPage from "./components/IntroPage";
import GamePage from "./components/GamePage";
import NotFoundPage from "./components/NotFoundPage";
//theme
import { ThemeProvider } from "styled-components";
import { theme_dark, theme_light } from "./styles/theme";

const App = ()=> {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme_dark}>
          <Routes>
            <Route path="/intro" element={<IntroPage/>} />
            <Route path="/play" element={<GamePage/>} />
            <Route path="/*" element={<NotFoundPage/>} />
          </Routes>
          <Globalstyle/>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
