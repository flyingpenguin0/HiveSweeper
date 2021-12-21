import { createGlobalStyle } from "styled-components";

export const Globalstyle = createGlobalStyle`
    :root{
        --yellow : #FFDB58;
        --white: #fff;
        --lightGrey: #eee;
        --midGrey: #353535;
        --darkGrey: #1c1c1c;
    }

    * {
        box-sizing: border-box;
        padding:0;
        margin:0;
    }
`;