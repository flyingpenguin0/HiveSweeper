import { combineReducers } from "redux";
import counter from "./counter";
import cell from "./cells";
import hive from "./hive";
import leaderboard from "./leaderboard";

const rootReducer = combineReducers({
    counter : counter,
    cell : cell,
    hive : hive,
    leaderboard : leaderboard
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;