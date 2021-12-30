import { combineReducers } from "redux";
import counter from "./counter";
import game from "./game";
import leaderboard from "./leaderboard";

const rootReducer = combineReducers({
    counter,
    game
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;