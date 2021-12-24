import React from "react";
import styled from "styled-components";

const NewGameSelector = () => {
    return(
        <Wrapper>
            <h5>New Game</h5>
            <ButtonWrapper>
                <button>EASY</button>
                <button>MEDIUM</button>
                <button>HARD</button>
                <button>EXTREME</button>
            </ButtonWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width : 40%;
    height : 5vh;
`;

const ButtonWrapper = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-evenly;
    align-items : center;
`;

export default NewGameSelector;