import React from "react";
import styled from "styled-components";
import axios from "axios";

type ModalProp = {
    isToggled : boolean
} 

type Rank = {
    index : number,
    name : string,
    level : string,
    time : number
}

const ModalGameOver = ()  => {

    return(<Wrapper>
        GAME OVER
    </Wrapper>);
}

const Wrapper = styled.div`
    width:fit-content;
    height:fit-content;
    position:fixed;
    padding:3rem;
    font-size:3rem;
    font-weight:bold;
    color:red;
    border-radius:3rem;
    border : solid 10px red;
    background-color:${props=>props.theme.mainBackground};
    filter:drop-shadow(0 0 1rem tomato);
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index : 10;
`;


export default ModalGameOver;