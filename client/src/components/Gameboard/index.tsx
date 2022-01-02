import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Cell from "../Cell";
import { setConstantValue } from "typescript";
import {HiveState, CellState, Level} from "../../modules/game";
import { getDimension, levelArray } from "../../utilities/Hivegenerator";

const Wrapper = styled.div`
    width: ${props=>{
        let level : number = props.children[0]._owner.memoizedProps.game.level;
        console.log(level);
        return getDimension(level).width * levelArray[level-1].widthNum;
    }}px;
    height : ${props=>{
        let level : number = props.children[0]._owner.memoizedProps.game.level;
        return getDimension(level).height * levelArray[level-1].heightNum * 0.75;
    }}px;
    border : solid 1px black;
    background-color : var(--darkGrey);
    height: 90vh;
    position: relative;
    margin : 0 auto;
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
    let height : number = getDimension(game.level).height;
    let width : number = getDimension(game.level).width;

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
                    top={cell.top*height}
                    left={cell.left*width}
                    width={width*0.95}
                    height={height*0.95}
                    leftClick={leftClick}
                    rightClick={rightClick}
                    />
                )
            })}
        </Wrapper>
    )
}

export default React.memo(GameBoard);