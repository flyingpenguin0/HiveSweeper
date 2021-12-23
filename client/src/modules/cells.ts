import { createSecureContext } from "tls";
import { Shuffle } from "../HiveFunc";

//action
const RIGHT_CLICK = "cells/RIGHT_CLICK" as const;
const LEFT_CLICK = "cells/LEFT_CLICK" as const;
const RESET_CELL = "cells/RESET" as const;

const RESET_HIVE = "cells/RESET_HIVE" as const;
const NEW_HIVE = "cells/NEW_HIVE" as const;

type HiveState = Array<CellState>;

type CellState = {
    index : number;
	isBee : boolean;
	neighbor : number;
	isOpen : boolean;
	isFlagged : boolean;
	isQuestion : boolean;
	top : number;
	left : number;
}

enum Level{
    EASY = 1,
    MEDIUM,
    HARD,
    EXTREME
}

enum Window{
    landscape = 0,
    portrait
}

// cell action creator
export const rightClick = (current : CellState) => {
    type : RIGHT_CLICK;
    payload : current;
}
export const leftClick = (current : CellState) => {
    type : LEFT_CLICK;
    payload : current;
}
export const resetCell = () => {
    type : RESET_CELL;
}

// hive action creator
export const resetHive = () => {
    type : RESET_HIVE;
}
export const newHive = (level : Level, window : Window) => {
    type : NEW_HIVE;
}

// type of action object
type CellAction = ReturnType<typeof rightClick> | ReturnType<typeof leftClick> | ReturnType<typeof resetCell>;
type HiveAction = ReturnType<typeof resetHive> | ReturnType<typeof newHive>;


// initial states
const initCellState : CellState = {
    index : 0,
	isBee : false,
	neighbor : 0,
	isOpen : false,
	isFlagged : false,
	isQuestion : false,
	top : 0,
	left : 0
}

const initHiveState : HiveState = [];

// reducer fnc

const cell = (
    state : CellState = initCellState,
    action : CellAction
) : CellState => {
    switch(action.type){
        case LEFT_CLICK :

        case RIGHT_CLICK : 

        case RESET_CELL :

        default : 
            return state;
    }
}

const hive = (
    state : HiveState = initHiveState,
    action : HiveAction
) : HiveState => {
    switch(action.type){
        case RESET_HIVE :

        case NEW_HIVE :
        
        default : 
            return state;
    }
}

export default { cell, hive }
