import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const Globalstyle = createGlobalStyle`
    ${reset}
    :root{
        --lightYellow : #FFE87C;
        --yellow : #FFDB58;
        --darkYellow : #FBB917;
        --white: #fff;
        --yellowGrey : #B09967;
        --lightGrey: #eee;
        --midGrey: #353535;
        --darkGrey: #1c1c1c;
    }

    * {
        box-sizing: border-box;
        padding:0;
        margin:0;
        transition : all 0.3s;
    }

    button{
        display: inline-block;
        color: #212529;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 0.7rem;
        font-weight:bold;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        color: #212529;
        background-color: #ffc107;
        border-color: #ffc107;
        margin : 0 0.2rem;

        @media (max-width : 991.98px){
            font-size:1rem;
        }
    }

    button:hover {
        color: #212529;
        background-color: #e0a800;
        border-color: #d39e00;
    }

    button:focus {
        box-shadow: 0 0 0 0.2rem rgba(222, 170, 12, 0.5);
    }
`;