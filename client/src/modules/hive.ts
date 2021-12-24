import { createSecureContext } from "tls";
import { Shuffle } from "../HiveFunc";

//action
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

// hive action creator
export const resetHive = () => {
    type : RESET_HIVE;
}
export const newHive = (level : Level, window : Window) => {
    type : NEW_HIVE;
    level;
    window;
}

// type of action object
type HiveAction = ReturnType<typeof resetHive> | ReturnType<typeof newHive>;

// initial states
const initHiveState : HiveState = [];

// reducer fnc

const hive = (
    state : HiveState = initHiveState,
    action : HiveAction
) : HiveState => {
    switch(action.type){
        case RESET_HIVE :
            return state;
        case NEW_HIVE :
            state.concat(Shuffle(45,30,9));
        default : 
            return state;
    }
}

export default hive;
