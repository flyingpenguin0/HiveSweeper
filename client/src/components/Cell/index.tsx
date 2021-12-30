import React from "react";
import styled, { DefaultTheme, keyframes, StyledComponent } from "styled-components";
import { GiBee } from "react-icons/gi";
import { FaFlag, FaQuestion } from "react-icons/fa";

const Wrapper = styled.div<Prr>`
    width: ${Math.sqrt(3)*50}px;
    position : absolute;
    text-align : center;
    margin:auto;
    top : ${(props : CellProps) => props.top? props.top : 0}px;
    left : ${(props : CellProps) => props.left? props.left : 0}px;
    height : 100px;
    background-color: ${(props) => props.isOpen? `var(--yellow)` : `var(--lightGrey)`};
    clip-path : polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 

    &:hover{
        background-color : ${(props) => props.isOpen? `var(--yellow)` : `var(--midGrey)`};
        cursor : ${(props) => props.isOpen ? `auto` : `pointer`};
    }
    div{
        font-size:2.5rem;
    }
`;

interface Prr {
    index : number;
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
    index : number;
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

const Cell = ( CellProps : CellProps ) => {
    const {index, isBee, neighbor, isOpen, isFlagged, isQuestion, top, left, leftClick, rightClick} = CellProps;

    const rightCl = (event:any) => {
        event.preventDefault;
        rightClick(index);
    }
    return(
        <Wrapper onClick={()=>leftClick(index)} onContextMenu={rightCl}>
            <div>
            {!isOpen
                ? null
                : isBee
                    ? <GiBee/>
                    : isFlagged
                        ? <FaFlag/>
                        : isQuestion
                            ? <FaQuestion/>
                            : neighbor
            }
            </div>
        </Wrapper>
    )
}

export default Cell;

