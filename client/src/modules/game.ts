import { Shuffle } from "../utilities/Hivegenerator";
import { delay, put } from 'redux-saga/effects';
import { getNeighbor, levelArray } from "../utilities/Hivegenerator";

//action
const RESET_HIVE = "game/RESET_HIVE" as const;
const NEW_HIVE = "game/NEW_HIVE" as const;

const LEFT_CLICK = "game/LEFT_CLICK" as const;
const RIGHT_CLICK ="game/RIGHT_CLICK" as const;

export type GameState = {
    hive : HiveState,
    gameOver : boolean,
    gameEnd : boolean,
    countHoney : number,
    countFlag : number,
    level : number
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


// action creator
export const resetHive = () => ({
    type : RESET_HIVE
});
export const newHive = (level : Level) => ({
    type : NEW_HIVE,
    payload : level
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
    hive : Shuffle(1),
    gameOver : false,
    gameEnd : false,
    countHoney : 0,
    countFlag : 0,
    level:1
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
            return Object.assign({}, state, {hive:newState, gameOver:false, gameEnd:false, countHoney:0, countFlag:0});
        case NEW_HIVE :
            switch(action.payload){
                case 1 :
                    return Object.assign({}, state, {hive:Shuffle(1), gameOver:false, gameEnd:false, countHoney:0, countFlag:0, level:1});
                case 2 : 
                    return Object.assign({}, state, {hive:Shuffle(2), gameOver:false, gameEnd:false, countHoney:0, countFlag:0, level:2});
                case 3 :
                    return Object.assign({}, state, {hive:Shuffle(3), gameOver:false, gameEnd:false, countHoney:0, countFlag:0, level:3});
                case 4 :
                    return Object.assign({}, state, {hive:Shuffle(4), gameOver:false, gameEnd:false, countHoney:0, countFlag:0, level:4});
                default:
                    return Object.assign({}, state, {hive:Shuffle(1), gameOver:false, gameEnd:false, countHoney:0, countFlag:0, level:1});
            }
        case LEFT_CLICK : 
            let cell : CellState = state.hive[action.payload-1];
            if(cell.isOpen || cell.isFlagged || cell.isQuestion || state.gameOver || state.gameEnd){
                return state;
            } else if(!cell.isBee && cell.neighbor!=0){
                let newHive = state.hive.map((cell, index) =>{
                    if(index==action.payload-1){
                        cell.isOpen = true;
                    }
                    return cell;
                });
                let unopened : number = state.hive.filter(cell=>!cell.isBee &&! cell.isOpen).length;
                if(unopened!=0){
                    return Object.assign({}, state, {hive:newHive, countHoney:state.countHoney+1});
                } else {
                    return Object.assign({}, state, {hive:newHive, countHoney:state.countHoney+1, gameEnd:true});
                }

            } else if(!cell.isBee && cell.neighbor==0){
                const level = state.level;
                const widthNum : any = levelArray.find((elem)=>elem.level==level)?.widthNum;
                const heightNum : any = levelArray.find((elem)=>elem.level==level)?.heightNum;

                let willOpen = new Set([cell.index]);
                let i : number = 1;
                while(i!=0){
                    let before : number = willOpen.size;
                    willOpen.forEach((num:number)=>{
                        let thisCell : any = state.hive.find((cell : CellState) => num==cell.index);
                        if(thisCell.neighbor==0){
                            let toArr = Array.from(willOpen);
                            toArr.push(...getNeighbor(num, widthNum, heightNum));
                            willOpen = new Set(toArr);
                        }
                    });
                    let after : number = willOpen.size;
                    i = after - before;
                }
                let newHive = state.hive.map((cell, index) =>{
                    if(willOpen.has(index+1)){
                        cell.isOpen = true;
                    }
                    return cell;
                });

                let unopenedHoney : number = state.hive.filter(cell=>!cell.isBee &&! cell.isOpen).length;
                let opened : number = state.hive.filter(cell=>cell.isOpen).length;
                if(unopenedHoney!=0){
                    return Object.assign({}, state, {hive:newHive, countHoney:opened});
                } else {
                    return Object.assign({}, state, {hive:newHive, countHoney:opened, gameEnd:true});
                }
            } else {
                let newHive = state.hive.map(cell =>{
                    if(cell.isBee){
                        cell.isOpen=true;
                    }
                    return cell;
                });
                return Object.assign({}, state, {hive : newHive, gameOver : true});
            }
        case RIGHT_CLICK :
            if(state.gameOver || state.gameEnd){
                return state;
            } else {
                let cell_r : CellState = state.hive[action.payload-1];
                switch(cell_r.isOpen){
                    case true :
                        return state;
                    case false : 
                        if(cell_r.isFlagged){
                                let newHive = state.hive.map((cell,index)=>{
                                    if(index == action.payload-1){
                                        return {...cell, isFlagged:false, isQuestion:true}
                                    }
                                    else {
                                        return cell;
                                    }
                                });
                                return Object.assign({}, state, {hive:newHive, countFlag:state.countFlag-1});
                        } else if(cell_r.isQuestion){
                                let newHive2 = state.hive.map((cell,index)=>{
                                    if(index == action.payload-1){
                                        return {...cell, isFlagged:false, isQuestion:false}
                                    }
                                    else {
                                        return cell;
                                    }
                                });
                                return Object.assign({}, state, {hive:newHive2});
                        } else {
                                let newHive3 = state.hive.map((cell,index)=>{
                                    if(index == action.payload-1){
                                        return {...cell, isFlagged:true}
                                    }
                                    else {
                                        return cell;
                                    }
                                });
                                return Object.assign({}, state, {hive:newHive3, countFlag:state.countFlag+1});
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
