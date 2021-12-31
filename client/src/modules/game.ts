import { Shuffle } from "../HiveFunc";
import { delay, put } from 'redux-saga/effects';

//action
const RESET_HIVE = "game/RESET_HIVE" as const;
const NEW_HIVE = "game/NEW_HIVE" as const;

const LEFT_CLICK = "game/LEFT_CLICK" as const;
const RIGHT_CLICK ="game/RIGHT_CLICK" as const;

export type GameState = {
    hive : HiveState,
    gameOver : boolean,
    gameEnd : boolean,
}

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

// action creator
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


// type of action object
type HiveAction = ReturnType<typeof resetHive> | ReturnType<typeof newHive> | ReturnType<typeof leftClick> | ReturnType<typeof rightClick>;

// initial states
//let initHiveState : HiveState = Shuffle(15,10,9);
let initHiveState : GameState = {
    hive : Shuffle(15,10,9),
    gameOver : false,
    gameEnd : false
}

// reducer fnc

const game = (
    state : GameState = initHiveState,
    action : HiveAction
) : GameState => {
    switch(action.type){
        case RESET_HIVE :
            let newState : HiveState = state.hive.map((cell)=>{
                cell.isOpen = false;
                cell.isFlagged = false;
                cell.isQuestion = false;
                return cell;
            });
            //return Object.assign({}, state, {hive:newState});
            return {hive:newState, gameOver:false, gameEnd:false};
        case NEW_HIVE :
            //state.hive.splice(0, state.hive.length);
            switch(action.payload){
                case {level:1, window:0} :
                    /* state.hive.concat(...Shuffle(15,10,9)); */
                    return Object.assign({}, state, {hive:Shuffle(15,10,9)});
                case {level:2, window:0} : 
                    return Object.assign({}, state, {hive:Shuffle(30,20,9)});
                case {level:3, window:0}:
                    return Object.assign({}, state, {hive:Shuffle(45,30,9)});
                case {level:4, window:0}:
                    return Object.assign({}, state, {hive:Shuffle(90,40,15)});
                default:
                    return Object.assign({}, state, {hive:Shuffle(15,10,9)});
            }
        case LEFT_CLICK : 
            let cell : CellState = state.hive[action.payload-1];
            if(cell.isOpen || cell.isFlagged || cell.isQuestion){
                return state;
            } else if(!cell.isBee){
                let newHive = state.hive.map((cell, index) =>{
                    if(index==action.payload-1){
                        cell.isOpen = true;
                    }
                    return cell;
                });
                let unopened : number = state.hive.filter(cell=>!cell.isBee &&! cell.isOpen).length;
                if(unopened!=0){
                    //return {...state, hive:newHive}
                    return Object.assign({}, state, {hive:newHive});
                } else {
                    //return {...state, hive:newHive, gameEnd:true}
                    return Object.assign({}, state, {hive:newHive, gameEnd:true});
                }
            } else {
                let newHive = state.hive.map(cell =>{
                    if(cell.isBee){
                        cell.isOpen=true;
                    }
                    return cell;
                });
                //state.hive[action.payload-1].isOpen = true;
                //return {...state, gameOver : true}
                return Object.assign({}, state, {hive : newHive, gameOver : true});
            }
        case RIGHT_CLICK :
            if(state.gameOver || state.gameEnd){
                return state;
            } else{
                let cell_r : CellState = state.hive[action.payload-1];
                switch(cell_r.isOpen){
                    case true :
                        return state;
                    case false : 
                        switch([cell_r.isFlagged, cell_r.isQuestion]){
                            case [true, false]:
                                [state.hive[action.payload-1].isFlagged, state.hive[action.payload-1].isQuestion] = [false, true];
                                return state;
                            case [false, true]:
                                [state.hive[action.payload-1].isFlagged, state.hive[action.payload-1].isQuestion] = [false, false];
                                return state;
                            case [false, false] :
                                [state.hive[action.payload-1].isFlagged, state.hive[action.payload-1].isQuestion] = [true, false];
                                return state;
                            default :
                                return state;
                        }
                    default : 
                        return state;
                }
            }
        default : 
            return state;
    }
}

export default game;