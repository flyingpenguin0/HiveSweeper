import React from "react";
import { useSelector, useDispatch } from "react-redux";
import NewGameSelector from "./index";
import {resetHive, newHive, Window, Level} from "../../modules/hive";
import { RootState } from '../../modules';

const SelectorContainer = () => {
    const hive = useSelector((state:RootState) => state.hive);
    const dispatch = useDispatch();

    const resetHive = () => {
        dispatch(resetHive());
    }
    const newHive = (level : Level, window : Window) => {
        dispatch(newHive(level, window));
    }

    return(<NewGameSelector resetHive={resetHive} newHive={newHive} hive={hive} />);
}

export default SelectorContainer;