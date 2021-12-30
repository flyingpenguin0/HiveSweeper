import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Cell from "../Cell";
import { setConstantValue } from "typescript";
import {HiveState, CellState, Level, Window} from "../../modules/game";

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
    game : {
        hive : Array<CellState>,
        gameOver : boolean,
        gameEnd : boolean
    };
}

const GameBoard = ({resetHive, newHive, leftClick, rightClick, game} : HiveProps) => {
    return(
        <Wrapper>
            {game.hive.map((cell) =>{
                return(
                    <Cell
                    key={cell.index}
                    index={cell.index}
                    isBee={cell.isBee}
                    neighbor={cell.neighbor}
                    isOpen={cell.isOpen}
                    isFlagged={cell.isFlagged}
                    isQuestion={cell.isQuestion}
                    top={cell.top}
                    left={cell.left}
                    leftClick={leftClick}
                    rightClick={rightClick}
                    />
                )
            })}
        </Wrapper>
    )
}

export default GameBoard;