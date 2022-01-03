import React from "react";
import styled from "styled-components";

const ModalInfo = ()  => {
    return(<Wrapper></Wrapper>);
}

const Wrapper = styled.div`
    width:50%;
    height:50vh;
    position:fixed;
    background-color:white;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index : 10;
`;


export default ModalInfo;