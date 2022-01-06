import React from "react";
import notfound from "../static/404.png";
import styled from "styled-components";

const NotFoundPage = () => {
    return(
        <NotFound/>
    )
}
const NotFound = styled.div`
    width:100%;
    height:100vh;
    background-image: url(${notfound});
    background-size:cover;
    background-repeact:no-repeat;
`;

export default NotFoundPage;