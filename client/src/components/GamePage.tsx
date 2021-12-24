import React from "react";
//components
import Navbar from "./Navbar";
import Gameboard from "./Gameboard";
import Console from "./Console";
import NewGameSelector from "./NewGameSelector";
import styled from "styled-components";



const GamePage : React.FC = () => {
    return(
        <div>
            <Navbar/>
            <ConsoleWrapper>
                <Console/>
                <NewGameSelector/>
            </ConsoleWrapper>
            <Gameboard />
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