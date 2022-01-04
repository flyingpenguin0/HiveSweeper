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
            <ButtonWrapper>
                <ResetBox>
                    <h6>Reset</h6>
                    <button onClick={onClickReset}>RESET</button>
                </ResetBox>
                <NewGameBox>
                    <h6>New Game</h6>
                    <button onClick={onClickEasy}>EASY</button>
                    <button onClick={onClickMed}>MEDIUM</button>
                    <button onClick={onClickHard}>HARD</button>
                </NewGameBox>
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width : 25%;
    min-width : fit-content;
    height : fit-content;
    padding: 1rem 0rem;
    
    border-radius:0.5rem;
    display : flex;
    justify-content : space-evenly;
    align-items : center;
    background-color:${props=>props.theme.mainBackground};

    @media (max-width: 991.98px) {
        width:100%;
        margin-bottom:0.5rem;
    }
`;

const ResetBox = styled.div`
    height:fit-content;
    border-right : solid 1px yellow;

    h6{
        margin:0.5rem;
        font-size:1.2rem;
        font-weight:bolder;
        color:${props=>props.theme.secondaryText};
    }
`;

const NewGameBox = styled.div`
    height:fit-content;

    h6{
        margin:0.5rem;
        font-size:1.2rem;
        font-weight:bold;
        color:${props=>props.theme.secondaryText};
    }
`

const ButtonWrapper = styled.div`
    width:fit-content;
    height:fit-content;
    display : flex;
    flex-direction : row;
    justify-content : space-evenly;
    align-items : center;
    padding:0 0.5rem;

`;

export default React.memo(NewGameSelector);