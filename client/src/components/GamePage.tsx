import React, {useContext, useEffect, useState} from "react";
//components
import GameBoardContainer from "./Gameboard/container";
import Console from "./Console";
import SelectorContainer from "./NewGameSelector/selectorContainer";
import styled from "styled-components";
//modal components
import ModalScreen from "./Modals/ModalScreen";
import ModalGameEnd from "./Modals/ModalGameEnd";
import ModalGameOver from "./Modals/ModalGameOver";
//dispatch actions
import { resetHive } from "../modules/game";
import { reset } from "../modules/counter";
import { RootState } from "../modules";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../context/socket";

const GamePage : React.FC = () => {
    const Game = useSelector((state:RootState) => state.game);
    const [toggled, setToggled] = useState([false, false]);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    
    const onClickScreen = () : void => {
        let newState = [false, false];
        setToggled(newState);
    }

    useEffect(()=>{
        if(Game.gameEnd){
            let newState = [false,true];
            setToggled(newState);
        }
        if(Game.gameOver){
            let newState =[true,false];
            setToggled(newState);
        }
    },[Game]);

    useEffect(()=>{
        return ()=>{
            dispatch(resetHive());
            dispatch(reset());
            socket.emit("gameOver");
        }
    }, [dispatch]);

    return(
        <Wrapper>
            <ConsoleWrapper>
                <Console/>
                <SelectorContainer/>
            </ConsoleWrapper>
            <GameBoardContainer/>
            {
            toggled[0]
            ? (
                <>
                <ModalGameOver />
                <ModalScreen toggle={onClickScreen}/>
                </>
            )
            : (null)
            } {
            toggled[1]
                ? (
                <>
                    <ModalGameEnd toggle={onClickScreen} level={"EASY"}/>
                    <ModalScreen toggle={onClickScreen}/>
                </>
                )
                : (null)
            }
        </Wrapper>
    )
}

export default GamePage;
const Wrapper = styled.div`
    width:100%;
    height:100vh;
    background-color:${props=>props.theme.background};
`;

const ConsoleWrapper = styled.div`
    width: 100%;
    height : fit-content;
    padding : 1rem;
    display : flex;
    justify-content:space-evenly;
    align-items:center;
    
    @media (max-width: 991.98px){
        display:block;
    }
`;