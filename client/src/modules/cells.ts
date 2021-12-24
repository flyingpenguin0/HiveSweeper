import { createSecureContext } from "tls";
import { Shuffle } from "../HiveFunc";

//action
const RIGHT_CLICK = "cells/RIGHT_CLICK" as const;
const LEFT_CLICK = "cells/LEFT_CLICK" as const;
const RESET_CELL = "cells/RESET" as const;

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

// type of action object
type CellAction = ReturnType<typeof rightClick> | ReturnType<typeof leftClick> | ReturnType<typeof resetCell>;


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

// reducer fnc

const cell = (
    state : CellState = initCellState,
    action : CellAction
) : CellState => {
    switch(action.type){
        case LEFT_CLICK :
            if(state.isOpen || state.isFlagged || state.isQuestion){
                return state;
            } else if (!state.isBee){
                state.isOpen = true;
                return state;
            } else {
                state.isOpen = true;
                // how to end game??
            }
        case RIGHT_CLICK : 
            if(state.isOpen){
                return state;
            } else if(state.isFlagged){
                state.isFlagged = false;
                state.isQuestion = true;
                return state;
            } else if(state.isQuestion){
                state.isQuestion = false;
                return state;
            } else {
                state.isFlagged = true;
                return state;
            }
        case RESET_CELL :
            state.isOpen = false;
            state.isFlagged = false;
            state.isQuestion = false;
            return state;
        default : 
            return state;
    }
}

export default cell;
