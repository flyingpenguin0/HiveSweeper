import React from "react";
import styled, { DefaultTheme, keyframes, StyledComponent } from "styled-components";
import { GiBee } from "react-icons/gi";
import { FaFlag, FaQuestion } from "react-icons/fa";

const Wrapper = styled.div`
    width: ${Math.sqrt(3)*50}px;
    position : absolute;
    top : ${(props) => {
        return props.children._owner.memoizedProps.top;
    }}px;
    left : ${(props : CellProps) => props.children._owner.memoizedProps.left}px;
    height : 100px;
    background-color: var(--darkYellow);
    clip-path : polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 

    div{
        position:relative;
        width:100%;
        height:100%
    }   
`;

const Content = styled.div`
    margin : 0.1rem;
    width : 70%;
    height: 70%;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    clip-path : polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
    background-color: ${(props) => {
        if(props.children._owner.memoizedProps.isOpen){
            if(props.children._owner.memoizedProps.isBee){
                return `crimson`;
            } else {
                return `var(--yellow)`
            }
        } else {
            return `var(--lightGrey)`;
        }
    }};
    
    &:hover{
        background-color : ${(props) => props.children._owner.memoizedProps.isOpen? null: `var(--midGrey)`};
        cursor : ${(props) => props.children._owner.memoizedProps.isOpen ? `auto` : `pointer`};
    }

    div{
        font-size:2.5rem;
        height:2.5rem;
        max-width:fit-content;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        color : black;
        filter: ${(props)=> props.children._owner.memoizedProps.isOpen && props.children._owner.memoizedProps.isBee? `drop-shadow(0 0 0.75rem black)` : null };
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
    window.addEventListener("contextmenu", e => e.preventDefault());

    const {index, isBee, neighbor, isOpen, isFlagged, isQuestion, top, left, leftClick, rightClick} = CellProps;

    return(
        <Wrapper>
            <div>
                <Content onClick={()=>leftClick(index)} onContextMenu={()=>rightClick(index)}>
                <div>
                {isOpen && isBee
                    ? <GiBee/>
                    : isFlagged
                    ? <FaFlag/>
                    : isQuestion
                        ? <FaQuestion/>
                        : !isOpen
                            ? null
                            : neighbor
                }
                </div>
                </Content>
            </div>
        </Wrapper>
    )
}

export default Cell;

