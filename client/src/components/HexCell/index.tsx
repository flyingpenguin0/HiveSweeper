import React from "react";
import styled from "styled-components";

const Hex = styled.div`
    width: ${Math.sqrt(3)*50}px;
    height : 100px;
    background-color: lightblue;
    clip-path : polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); 
    
    margin : 50px;
`;

const HexCell : React.FC = () => {
    return(
        <Hex>
            {}
        </Hex>
    )
}

export default HexCell;