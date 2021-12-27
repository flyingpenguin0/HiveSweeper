import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Cell from "../Cell";
import { setConstantValue } from "typescript";
import {HiveState, CellState, Level, Window} from "../../modules/hive";

const Wrapper = styled.div`
    width:100%;
    height: 90vh;
    border : solid 1px black;
    position: relative;
`;

type HiveProps = {
    resetHive : () => void;
    newHive : (level : Level, window : Window) => void;
    leftClick : (index : number) => void;
    rightClick : (index : number) => void;
    gameOver : () => void;
    hive : Array<CellState>;
}

const GameBoard = ({resetHive, newHive, leftClick, rightClick, gameOver, hive} : HiveProps) => {
    return(
        <Wrapper>
            {hive.map((cell) =>{
                return(
                    <Cell
                    key={cell.index}
                    isBee={cell.isBee}
                    neighbor={cell.neighbor}
                    isOpen={cell.isOpen}
                    isFlagged={cell.isFlagged}
                    isQuestion={cell.isQuestion}
                    top={cell.top}
                    left={cell.left}
                    onClick={()=>leftClick(cell.index)}
                    onContextMenu={()=>rightClick(cell.index)}
                    />
                )
            })}
        </Wrapper>
    )
}

export default GameBoard;