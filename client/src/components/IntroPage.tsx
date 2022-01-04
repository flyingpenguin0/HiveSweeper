import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const IntroPage : React.FC = () => {
    return(
        <Wrapper>
            <Link to="/play"><button>Start Game</button></Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    background-color: ${props=>props.theme.background};
    
    button{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }
`;

export default IntroPage;