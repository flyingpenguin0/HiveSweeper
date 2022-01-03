import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Globalstyle} from "./styles/GlobalStyle";
import Navbar from "./components/Navbar";
import IntroPage from "./components/IntroPage";
import GamePage from "./components/GamePage";
import NotFoundPage from "./components/NotFoundPage";
import ModalInfo from "./components/Modals/ModalInfo";
import ModalAwards from "./components/Modals/ModalAwards";
import ModalContacts from "./components/Modals/ModalContacts";
import ModalScreen from "./components/Modals/ModalScreen";
//theme
import { ThemeProvider } from "styled-components";
import { theme_dark, theme_light } from "./styles/theme";
// socket context import
import {socket, SocketContext} from "./context/socket";

const App = ()=> {

  const [toggled, setToggled] = useState([false, false, false]);

  const toggle = (num : number) : void => {
    let newState = [false,false,false];
    newState[num] = true;
    setToggled(newState);
  }

  const onClickScreen = () : void => {
    let newState = [false, false,false];
    setToggled(newState);
  }

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme_dark}>
          <SocketContext.Provider value={socket}>
            <Navbar toggle={toggle} clearModal={onClickScreen}/>
            {
            toggled[0]
              ? (
                <>
                  <ModalInfo/>
                  <ModalScreen toggle={onClickScreen}/>
                </>
              )
              : (null)
            } {
              toggled[1]
                ? (
                  <>
                    <ModalAwards/>
                    <ModalScreen toggle={onClickScreen}/>
                  </>
                )
                : (null)
            } {
              toggled[2]
                ? (
                  <>
                    <ModalContacts/>
                    <ModalScreen toggle={onClickScreen}/>
                  </>
                )
                : (null)
            }
            <Routes>
              <Route path="/intro" element={<IntroPage/>} />
              <Route path="/play" element={<GamePage/>} />
              <Route path="/*" element={<NotFoundPage/>} />
            </Routes>
            <Globalstyle/>
          </SocketContext.Provider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
