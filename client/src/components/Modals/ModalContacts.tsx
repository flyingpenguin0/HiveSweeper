import React from "react";
import styled from "styled-components";

type ModalProp = {
    isToggled : boolean
}

const ModalContacts = ()  => {
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

    @media screen and (max-width: 500px) {
        width : 90%;
        height: 90vh;   
    }
`;


export default ModalContacts;