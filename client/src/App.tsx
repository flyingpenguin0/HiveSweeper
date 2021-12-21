import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Globalstyle} from "./GlobalStyle";
import IntroPage from "./components/IntroPage";
import GamePage from "./components/GamePage";
import NotFoundPage from "./components/NotFoundPage";

const App : React.FC = ()=> {
  return (
    <div className="App"> 
      <Router>
        <Routes>
            <Route path="/intro" element={<IntroPage/>} />
            <Route path="/play" element={<GamePage/>} />
            <Route path="/*" element={<NotFoundPage/>} />
          </Routes>
          <Globalstyle/>
      </Router>
    </div>
  );
}

export default App;
