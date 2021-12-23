import { combineReducers } from "redux";
import counter from "./counter";
import cells from "./cells";
import leaderboard from "./leaderboard";

const rootReducer = combineReducers({
    counter,
    cells,
    leaderboard
});

export default rootReducer;