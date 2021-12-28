import React, { ReactNode } from "react";
import styled, { DefaultTheme, keyframes, StyledComponent } from "styled-components";
//import { leftClick, rightClick } from "../../modules/hive";

const Wrapper : any = styled.div<Prr>`
    width: ${Math.sqrt(3)*50}px;
    position : absolute;
    text-align : center;
    aligh-items : center;
    top : ${(props) => props.top}px;
    left : ${(props) => props.left}px;
    height : 100px;
    background-color: lightblue;
    clip-path : polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
`;

interface Prr {
    key : number;
    isBee : boolean;
    neighbor : number;
    isOpen : boolean;
    isFlagged : boolean;
    isQuestion : boolean;
    top : number;
    left : number;
    leftClick : (index:number) => void;
    rightClick : (index:number) => void;
}

type CellProps = {
    key : number;
    isBee : boolean;
    neighbor : number;
    isOpen : boolean;
    isFlagged : boolean;
    isQuestion : boolean;
    top : number;
    left : number;
    leftClick : (index:number) => void;
    rightClick : (index:number) => void;
}

interface Props {
    children : null;
    CellProps : CellProps;
}

const Cell = ( CellProps : CellProps ) => {
    const {key, isBee, neighbor, isOpen, isFlagged, isQuestion, top, left, leftClick, rightClick} = CellProps;

    return(
        <Wrapper onClick={()=>leftClick(key)} onContextMenu={()=>rightClick(key)}>
            {isOpen
                ? key
                : isBee
                    ? null
                    : isFlagged
                        ? null
                        : isQuestion
                            ? null
                            : neighbor
            }
        </Wrapper>
    )
}

export default Cell;

