import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GameBoard from "./index";
import {resetHive, newHive, leftClick, rightClick, gameOver, HiveState, CellState, Window, Level} from "../../modules/hive";
import { RootState } from '../../modules';

const GameBoardContainer = () => {

    const Hive = useSelector((state:RootState) => state.hive);
    const dispatch = useDispatch();

    const resetHive = () => {
        dispatch(resetHive());
    }
    const newHive = (level : Level, window : Window) => {
        dispatch(newHive(level, window));
    }
    const leftClick = (index : number) => {
        dispatch(leftClick(index));
    }
    const rightClick = (index : number) => {
        dispatch(rightClick(index));
    }
    const gameOver = () => {
        dispatch(gameOver());
    }
    
    return(
        <GameBoard resetHive={resetHive} newHive={newHive} leftClick={leftClick} rightClick={rightClick} gameOver={gameOver} hive={Hive}/>
    );
}

export default GameBoardContainer;