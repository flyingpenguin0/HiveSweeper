import React from "react";
import Navbar from "./Navbar";
import Gameboard from "./Gameboard";



const GamePage : React.FC = () => {
    return(
        <div>
            <Navbar/>
            <Gameboard />
        </div>
    )
}

export default GamePage;