import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const Globalstyle = createGlobalStyle`
    ${reset}
    :root{
        --lightYellow : #FFE87C;
        --yellow : #FFDB58;
        --darkYellow : #FBB917;
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