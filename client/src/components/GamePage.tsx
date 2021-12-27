import React from "react";
//components
import Navbar from "./Navbar";
import GameBoard from "./Gameboard";
import GameBoardContainer from "./Gameboard/container";
import Console from "./Console";
import SelectorContainer from "./NewGameSelector/selectorContainer";
import styled from "styled-components";



const GamePage : React.FC = () => {
    return(
        <div>
            <Navbar/>
            <ConsoleWrapper>
                <Console/>
                <SelectorContainer/>
            </ConsoleWrapper>
            <GameBoardContainer/>
        </div>
    )
}

export default GamePage;

const ConsoleWrapper = styled.div`
    width: 100%;
    height : fit-content;
    padding : 1rem;
    margin : 1rem;
    display : flex;
    justify-content:space-between;
    align-items:center;
`;