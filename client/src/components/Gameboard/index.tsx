import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Cell from "../Cell";
import { setConstantValue } from "typescript";
import {HiveState, CellState, Level} from "../../modules/game";

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
        gameEnd : boolean,
        countHoney : number,
        countFlag : number,
        level:number
    };
}

const GameBoard = ({resetHive, newHive, leftClick, rightClick, game} : HiveProps) => {
    let height : number;
    switch(game.level){
        case 1 :
            height = Math.floor(window.innerHeight*0.8/(9*0.75));
            break;
        case 2 :
            height = Math.floor(window.innerHeight*0.8/(11*0.75)); 
            break;
        case 3 : 
            height = Math.floor(window.innerHeight*0.8/(15*0.75)); 
            break;
        case 4 : 
            height = Math.floor(window.innerHeight*0.8/(21*0.75)); 
            break;
        default : 
            height = Math.floor(window.innerHeight*0.8/(9*0.75)); 
    }

    const width : number = 0.5*height*Math.sqrt(3);

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
                    width={width}
                    height={height}
                    leftClick={leftClick}
                    rightClick={rightClick}
                    />
                )
            })}
        </Wrapper>
    )
}

export default GameBoard;