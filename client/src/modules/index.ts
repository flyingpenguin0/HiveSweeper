import { combineReducers } from "redux";
import counter from "./counter";
import cell from "./cells";
import hive from "./hive";
import leaderboard from "./leaderboard";

const rootReducer = combineReducers({
    counter,
    cell,
    hive,
    leaderboard
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;