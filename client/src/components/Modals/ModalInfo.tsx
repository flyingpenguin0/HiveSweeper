import React from "react";
import styled from "styled-components";

const ModalInfo = ()  => {
    return(
    
    <Wrapper>
        <p>Rules</p>
        <p>Every hexagonal cell has 2 ~ 6 adjacent cells.</p>
        <p>There are a total number of 15, 35, 75 bees ( depending on the level ), each occupying a cell.</p>
        <p>Left-clicking opens a cell and reveals its contents.</p>
        <p>Opening a cell which is occupied by a bee aborts the game ( Game over )</p>
        <p>Opening a cell which is not occupied by a bee reveals its contents, which is the number of adjacent cells occupied by a bee.</p>
        <p>A cell which doesn't have any adjacent bee-occupied cells will reveal a blank content and will open every adjacent blank cells and its neighboring cells automatically.</p>
        <p>Right-clicking marks an unopened cell with a flag, a question mark, and cylces back to a blank state on each consecutive click. Users cannot mark a cell which is already open.</p>
        <p>Opening all the unoccupied cell completes the game.</p>
    </Wrapper>);
}

const Wrapper = styled.div`
    width:fit-content;
    height:fit-content;
    position:fixed;
    padding:3rem;
    border-radius:3rem;
    border : solid 10px yellow;
    background-color:${props=>props.theme.mainBackground};
    filter:drop-shadow(0 0 1rem yellow);
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index : 10;
    display:flex;
    flex-direction:column;

    p{
        font-size : 1.2rem;
        color : grey;
        margin: 1rem;
    }
`;


export default ModalInfo;