import { combineReducers } from "redux";
import counter from "./counter";
import game from "./game";

const rootReducer = combineReducers({
    counter,
    game
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;