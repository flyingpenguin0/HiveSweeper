import React from "react";
import styled, { DefaultTheme, keyframes, StyledComponent } from "styled-components";
import { GiBee } from "react-icons/gi";
import { FaFlag, FaQuestion } from "react-icons/fa";

const Wrapper = styled.div`
    width: 100px;
    position : absolute;
    top : ${(props) => {
        return props.children._owner.memoizedProps.top;
    }}px;
    left : ${(props : CellProps) => props.children._owner.memoizedProps.left}px;
    height : 100px;
    background-color: ${(props) => props.children._owner.memoizedProps.isOpen? `var(--yellow)` : `var(--lightGrey)`};
    clip-path : polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 

    &:hover{
        background-color : ${(props) => props.children._owner.memoizedProps.isOpen? `var(--yellow)` : `var(--midGrey)`};
        cursor : ${(props) => props.children._owner.memoizedProps.isOpen ? `auto` : `pointer`};
    }
    div{
        font-size:2.5rem;
        width:100%;
        height:100%;
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

    const rightCl = ( event : React.SyntheticEvent) => {
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

