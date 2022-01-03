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
    },[]);

    const onClickEasy = () => {
        newHive(1);
        refresh("EASY");
    }

    const onClickMed = () => {
        newHive(2);
        refresh("MEDIUM");
    }

    const onClickHard = () => {
        newHive(3);
        refresh("HARD");
    }

    const onClickExt = () => {
        newHive(4);
        refresh("EXTREME");
    }

    const onClickReset = () => {
        resetHive();
        refresh("EASY");
    }

    return(
        <Wrapper>
            <h5>New Game</h5>
            <ButtonWrapper>
                <button onClick={onClickEasy}>EASY</button>
                <button onClick={onClickMed}>MEDIUM</button>
                <button onClick={onClickHard}>HARD</button>
                <button onClick={onClickExt}>EXTREME</button>
                <button onClick={onClickReset}>RESET</button>
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