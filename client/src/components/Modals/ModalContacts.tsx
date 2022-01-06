import React , {useRef} from "react";
import styled from "styled-components";
//import { useForm } from "react-hook-form";

type ModalProp = {
    toggle : ()=>void;
}

const ModalContacts = ({toggle}:ModalProp)  => {
    const username = useRef(null);
    
    const onSubmit = () => {
        toggle();
    }

    return(   
        <Wrapper>
        <Form>
            <p>Contact me at : </p>
            <input placeholder="NAME" ref={username}/>
            <input placeholder="EMAIL" ref={username}/>
            <input placeholder="TITLE" ref={username}/>
            <input placeholder="MESSAGE" ref={username}/>
            <button onClick={onSubmit}>Send</button>
        </Form>
    </Wrapper>);
}

const Wrapper = styled.div`
    width:fit-content;
    height:fit-content;
    position:fixed;
    padding:3rem;
    border-radius:3rem;
    border : solid 10px yellow;
    background-color:${props=>props.theme.mainBackground};
    filter:drop-shadow(0 0 1rem yellow);
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index : 10;
`;

const Form = styled.div`
    display:flex;
    flex-direction:column;
    width:fit-content;
    height:fit-content;
    margin-top : 2rem;
    margin-bottom : 2rem;
    margin-right:auto;
    margin-left : auto;

    p{
        font-size : 1.2rem;
        text-align : center;
        color : grey;
    }

    input{
        border-bottom:solid 1px grey;
        border-top : none;
        border-left : none;
        border-right : none;
        padding:0.5rem;
        color:lime;
        background-color:inherit;
        margin:1rem;

        :focus{
            border-bottom:solid 1px lime;
            border-top : none;
            border-left : none;
            border-right : none;
            outline:none;
        }
    }
`


export default ModalContacts;