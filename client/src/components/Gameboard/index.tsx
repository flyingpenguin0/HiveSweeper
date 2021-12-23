import React from "react";
import styled from "styled-components";
import HexCell from "../HexCell";

const Wrapper = styled.div`
    width:100%;
    height: 100vh;
    border : solid 1px black;
`;

const Gameboard : React.FC = () => {
    const test : Array<number> = [1,2,3,4,5,6,7,8,9,10];
    return(
        <Wrapper>
            {test.map(num=> <HexCell /> )}
        </Wrapper>
    )
}

export default Gameboard;