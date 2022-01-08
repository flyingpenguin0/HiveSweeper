import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Cell from "../Cell";
import { setConstantValue } from "typescript";
import {HiveState, CellState, Level} from "../../modules/game";
import { getDimension, levelArray } from "../../utilities/Hivegenerator";

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
    let height : number = getDimension(game.level).height;
    let width : number = getDimension(game.level).width;
    let level : number = game.level;

    const wrapper : React.CSSProperties= {
        width: `${getDimension(level).width * levelArray[level-1].widthNum}px`,
        height : `${getDimension(level).height * levelArray[level-1].heightNum * 0.75}px`,
        position: `relative`,
        margin : `0 auto`
    }

    return(
        <div style ={wrapper}>
            {game.hive.map((cell, i) =>{
                return(
                    <Cell
                    key={cell.index}
                    index={cell.index}
                    isBee={cell.isBee}
                    neighbor={cell.neighbor}
                    isOpen={cell.isOpen}
                    isFlagged={cell.isFlagged}
                    isQuestion={cell.isQuestion}
                    top={cell.top*height}
                    left={cell.left*width}
                    width={width*0.95}
                    height={height*0.95}
                    leftClick={leftClick}
                    rightClick={rightClick}
                    />
                )
            })}
        </div>
    )
}



export default React.memo(GameBoard);