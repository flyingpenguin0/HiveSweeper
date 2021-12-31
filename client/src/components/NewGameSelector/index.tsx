import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components";
import { SocketContext } from "../../context/socket";
import {CellState, Level} from "../../modules/game";

//import io, {Socket} from 'socket.io-client';
//import SocketIOClient from 'socket.io-client';

type SelectorProps = {
    resetHive : () => void;
    newHive : (level : Level) => void;
    game : {
        hive : Array<CellState>,
        gameOver : boolean,
        gameEnd : boolean
    };
}

const NewGameSelector = ({resetHive, newHive, game} : SelectorProps) => {
    //const socketRef : SocketIOClient = useRef();
    //const SOCKET_SERVER_URL = 'http://localhost:4000';
    //const socket : Socket = io("http://localhost:8000/");

    const socket = useContext(SocketContext);

    const refresh = (level:string) => {
        socket.emit("newGame", {level:level});
    }

    useEffect(()=>{
        refresh("EASY");
    },[])

    return(
        <Wrapper>
            <h5>New Game</h5>
            <ButtonWrapper>
                <button onClick={()=>newHive(1)}>EASY</button>
                <button onClick={()=>newHive(2)}>MEDIUM</button>
                <button onClick={()=>newHive(3)}>HARD</button>
                <button onClick={()=>newHive(4)}>EXTREME</button>
                <button onClick={()=>resetHive()}>RESET</button>
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width : 40%;
    height : 5vh;
`;

const ButtonWrapper = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-evenly;
    align-items : center;
`;

export default NewGameSelector;