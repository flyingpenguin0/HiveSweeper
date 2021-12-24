import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Gameboard from "./index";
import {resetHive, newHive} from "../../modules/hive";
import { stat } from 'fs';

const GameBoardContainer = () => {
    const Hive = useSelector(state => state.hive);
    const dispatch = useDispatch();
    return(<GameBoard/>)
}

export default GameBoardContainer;