import React from "react";
import styled from "styled-components";
import {CellState, Level, Window} from "../../modules/hive";

type SelectorProps = {
    resetHive : () => void;
    newHive : (level : Level, window : Window) => void;
    hive : Array<CellState>;
}

const NewGameSelector = ({resetHive, newHive, hive} : SelectorProps) => {
    return(
        <Wrapper>
            <h5>New Game</h5>
            <ButtonWrapper>
                <button onClick={()=>newHive(1,0)}>EASY</button>
                <button onClick={()=>newHive(2,0)}>MEDIUM</button>
                <button onClick={()=>newHive(3,0)}>HARD</button>
                <button onClick={()=>newHive(4,0)}>EXTREME</button>
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