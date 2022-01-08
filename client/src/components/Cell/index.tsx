import React, {useContext, useEffect, useState} from "react";
import styled, { DefaultTheme, keyframes, StyledComponent } from "styled-components";
import { GiBee } from "react-icons/gi";
import { FaFlag, FaQuestion } from "react-icons/fa";
import {SocketContext} from "../../context/socket";
import { RootState } from "../../modules";
import { useSelector } from "react-redux";
import { NumberSchemaDefinition } from "mongoose";

type CellProps = {
    index : number;
    isBee : boolean;
    neighbor : number;
    isOpen : boolean;
    isFlagged : boolean;
    isQuestion : boolean;
    top : number;
    left : number;
    width : number;
    height : number;
    leftClick : (index:number) => void;
    rightClick : (index:number) => void;
}

const Cell = ( CellProps : CellProps ) => {
    window.addEventListener("contextmenu", e => e.preventDefault());
    const {index, isBee, neighbor, isOpen, isFlagged, isQuestion, top, left, width, height, leftClick, rightClick} = CellProps;
    const Game = useSelector((state:RootState) => state.game);
    const socket = useContext(SocketContext);
    const [gameOver, setGameOver] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);

    useEffect(()=>{
        setGameEnd(Game.gameEnd);
        setGameOver(Game.gameOver);

        if(Game.gameOver){
            socket.emit("gameOver");
        }
        if(Game.gameEnd){
            socket.emit("gameEnd");
        }
    },[Game]);

    return(
        <Wrapper width={width} height={height} top={top} left={left}>
            <div>
                <Content isOpen={isOpen} isBee={isBee} onClick={()=>leftClick(index)} onContextMenu={()=>rightClick(index)}>
                <div>
                {isOpen && isBee
                    ? <GiBee/>
                    : isFlagged
                    ? <FaFlag/>
                    : isQuestion
                        ? <FaQuestion/>
                        : !isOpen || neighbor==0
                            ? null
                            : neighbor
                }
                </div>
                </Content>
            </div>
        </Wrapper>
    )
}

interface CellWrapper {
    width : number,
    height : number,
    top : number,
    left : number
}

interface CellContent {
    isOpen : boolean,
    isBee : boolean
}

const Wrapper = styled.div<CellWrapper>`
    width : ${(props : any) => props.width}px;
    position : absolute;
    top : ${(props) => {
        return props.top;
    }}px;
    left : ${(props) => props.left}px;
    height : ${(props) => props.height}px;
    clip-path : polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 

    div{
        position:relative;
        width:100%;
        height:100%
    }   
`;

const Content = styled.div<CellContent>`
    margin : 0.1rem;
    width : 70%;
    height: 70%;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    clip-path : polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background-color: ${(props) => {
        if(props.isOpen){
            if(props.isBee){
                return `#302108`;
            } else {
                return `var(--darkYellow)`
            }
        } else {
            return `var(--yellowGrey)`;
        }
    }};
    
    &:hover{
        background-color : ${(props) => props.isOpen? null: `var(--yellow)`};
        cursor : ${(props) => props.isOpen ? `auto` : `pointer`};
    }

    div{
        font-size:2.5rem;
        height:2.5rem;
        max-width:fit-content;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        color : ${(props) => props.isOpen && props.isBee ? `#800202` : `black`};

        @media (max-width: 991.98px) {
            font-size:1.5rem;
            font-weight:bold;
            height:1.5rem;
        }
        
    }
`;

export default React.memo(Cell);

