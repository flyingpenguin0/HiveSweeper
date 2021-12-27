import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div<{top:number, left:number}>`
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
}

interface Props {
    children : null;
    CellProps : CellProps;
}

const Cell : React.FC<Prr> = ( CellProps : CellProps ) => {
    const {key, isBee, neighbor, isOpen, isFlagged, isQuestion, top, left} = CellProps;

    return(
        <Wrapper>
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

