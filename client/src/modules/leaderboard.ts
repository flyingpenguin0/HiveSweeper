//action 

const ADD_RECORD = "leaderboard/ADD_RECORD" as const;

type RecordState = {
    name : string,
    time : number,
}

// action creator
export const addRecord = (current : RecordState) => {
    type : ADD_RECORD;
    payload : current;
}

// type of action object
type RecordAction = ReturnType<typeof addRecord>;

// initial state

const initRecordState : RecordState = {
    name : "",
    time : 0
}

//reducer fnc
const rank = (
    state : RecordState = initRecordState,
    action : RecordAction
) : RecordState => {
    switch(action.type){
        case ADD_RECORD : 

        default :
            return state;
    }
}

export default rank;