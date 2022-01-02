import React from "react";
import { useSelector, useDispatch } from "react-redux";
import GameBoard from "./index";
import {resetHive, newHive, leftClick, rightClick, GameState, HiveState, CellState, Level} from "../../modules/game";
import { RootState } from '../../modules';

const GameBoardContainer = () => {

    const Game = useSelector((state:RootState) => state.game);
    const dispatch = useDispatch();

    const onResetHive = () => {
        dispatch(resetHive());
    }
    const onNewHive = (level : Level) => {
        dispatch(newHive(level));
    }
    const onLeftClick = (index : number) => {
        dispatch(leftClick(index));
    }
    const onRightClick = (index : number) => {
        dispatch(rightClick(index));
    }
    
    return(
        <GameBoard resetHive={onResetHive} newHive={onNewHive} leftClick={onLeftClick} rightClick={onRightClick} game={Game}/>
    );
}

export default React.memo(GameBoardContainer);