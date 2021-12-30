// 액션
const INCREASE_CELL = "counter/INCREASE_CELL" as const;
const INCREASE_FLAG = "counter/INCREASE_FLAG" as const;
const RESET = "counter/reset" as const;

// 액션 생성함수
export const increaseCell = () => ({
    type : INCREASE_CELL
});
export const increaseFlag = () => ({
    type : INCREASE_FLAG
});
export const reset = () => ({
    type : RESET
});

// 액션 객체의 type
type CounterAction = ReturnType<typeof increaseCell> | ReturnType<typeof increaseFlag> | ReturnType<typeof reset>;

// initial state의 type
type CounterState = {
    cellCount : number;
    flagCount : number;
};

const initialState : CounterState ={
    cellCount : 0,
    flagCount : 0
}

// reducer fnc
const counter = (
    state : CounterState = initialState,
    action : CounterAction
) : CounterState => {
    switch(action.type){
        case INCREASE_CELL :
            return { ...state, cellCount : state.cellCount+1}
        case INCREASE_FLAG :
            return { ...state, flagCount : state.flagCount+1 }
        case RESET :
            return{ ...state, cellCount : 0, flagCount : 0}
        default:
            return state;
    }
}

export default counter;