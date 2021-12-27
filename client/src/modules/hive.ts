import { Shuffle } from "../HiveFunc";
import { delay, put } from 'redux-saga/effects';
import { COPYFILE_FICLONE_FORCE } from "constants";
import { STATES } from "mongoose";
import cell from "./cells";

//action
const RESET_HIVE = "hive/RESET_HIVE" as const;
const NEW_HIVE = "hive/NEW_HIVE" as const;

const LEFT_CLICK = "hive/LEFT_CLICK" as const;
const RIGHT_CLICK ="hive/RIGHT_CLICK" as const;

const GAME_OVER = "hive/GAME_OVER" as const;

export type HiveState = Array<CellState>;

export type CellState = {
    index : number;
	isBee : boolean;
	neighbor : number;
	isOpen : boolean;
	isFlagged : boolean;
	isQuestion : boolean;
	top : number;
	left : number;
}

export enum Level{
    EASY = 1,
    MEDIUM = 2,
    HARD = 3,
    EXTREME = 4
}

export enum Window{
    landscape = 0,
    portrait = 1
}

// hive action creator
export const resetHive = () => ({
    type : RESET_HIVE
});
export const newHive = (level : Level, window : Window) => ({
    type : NEW_HIVE,
    payload : {level:level, window:window}
});
export const leftClick = (index : number) => ({
    type : LEFT_CLICK,
    payload : index
});
export const rightClick = (index : number) => ({
    type : RIGHT_CLICK,
    payload : index
});
export const gameOver = () => ({
    type : GAME_OVER
});

// type of action object
type HiveAction = ReturnType<typeof resetHive> | ReturnType<typeof newHive> | ReturnType<typeof leftClick> | ReturnType<typeof rightClick>;

// initial states
const initHiveState : HiveState = [];

// reducer fnc

const hive = (
    state : HiveState = initHiveState,
    action : HiveAction
) : HiveState => {
    switch(action.type){
        case RESET_HIVE :
            let newState : HiveState = state.map((cell)=>{
                cell.isOpen = false;
                cell.isFlagged = false;
                cell.isQuestion = false;
                return cell;
            });
            return newState;
        case NEW_HIVE :
            switch(action.payload){
                case {level:1, window:0} :
                    return Shuffle(15,10,9);
                case {level:2, window:0} : 
                    return Shuffle(30,20,9);
                case {level:3, window:0}:
                    return Shuffle(45,30,9);
                case {level:4, window:0}:
                    return Shuffle(90,45,15);
                default:
                    return Shuffle(15,10,9);
            }
        case LEFT_CLICK : 
            let cell : CellState = state[action.payload-1];
            cell.isOpen || cell.isFlagged || cell.isQuestion
                ? (state)
                : !cell.isBee
                    ? ( state.map(cell =>{
                        cell.isBee ? cell.isOpen = true : null
                        return cell;
                    }) ) 
                    : state[action.payload-1].isOpen = true;
                    return state;

        case RIGHT_CLICK :
            let cell_r : CellState = state[action.payload-1];
            switch(cell_r.isOpen){
                case true :
                    return state;
                case false : 
                    switch([cell_r.isFlagged, cell_r.isQuestion]){
                        case [true, false]:
                            [state[action.payload-1].isFlagged, state[action.payload-1].isQuestion] = [false, true];
                            return state;
                        case [false, true]:
                            [state[action.payload-1].isFlagged, state[action.payload-1].isQuestion] = [false, false];
                            return state;
                        case [false, false] :
                            [state[action.payload-1].isFlagged, state[action.payload-1].isQuestion] = [true, false];
                            return state;
                        default :
                            return state;
                    }
                default : 
                    return state;
            }
    }
}

export default hive;
