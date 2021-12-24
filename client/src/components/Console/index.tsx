import React from "react";
import styled from "styled-components";

const Console = () => {
    return(
        <Wrapper>
            <div>Total</div>
            <div>Bees</div>
            <div>Open</div>
            <div>Timer</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width : 50%;
    height : 5vh;
    display : flex;
    justify-content : space-evenly;
    align-items : center;
    
`;

export default Console;