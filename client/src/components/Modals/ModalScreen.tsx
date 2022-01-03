import React from "react";
import styled from "styled-components";

type ModalProp = {
    toggle : () => void;
}

const ModalScreen = ({toggle} : ModalProp)  => {
    return(<Wrapper onClick={()=>{toggle()}}></Wrapper>);
}

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    position:fixed;
    top:0;
    background-color : rgba(0,0,0,0.3);
    z-index : 3;
`;


export default ModalScreen;