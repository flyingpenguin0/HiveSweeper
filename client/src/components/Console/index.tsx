import React from "react";
import styled from "styled-components";

const Console = () => {
    return(
        <Wrapper>
            <div>Total : 266</div>
            <div>Bees : 45</div>
            <div>Open : 0</div>
            <div>Timer 00:00:00</div>
            <button>Reset</button>
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