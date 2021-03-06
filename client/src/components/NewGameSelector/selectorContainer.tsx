import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NewGameSelector from "./index";
import {resetHive, newHive, Level} from "../../modules/game";
import { RootState } from '../../modules';

const SelectorContainer = () => {
    const game = useSelector((state:RootState) => state.game);
    const dispatch = useDispatch();

    const onResetHive = () => {
        dispatch(resetHive());
    }
    const onNewHive = (level : Level) => {
        dispatch(newHive(level));
    }

    return(<NewGameSelector resetHive={onResetHive} newHive={onNewHive} game={game} />);
}

export default SelectorContainer;