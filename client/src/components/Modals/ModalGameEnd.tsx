import React, {useRef} from "react";
import styled from "styled-components";
import axios from "axios";

type ModalProp = {
    toggle : () => void;
}

const ModalGameEnd = ({toggle} : ModalProp )  => {
    const username = useRef(null);
    
    const onClick = () => {
        axios({
            method:"post",
            url:"/api",
            data:{index:1, name:"Mango", level:"EASY", time:365},
            withCredentials:true
        }).then((res)=>{
            console.log(res.data);
        }).catch(err=>console.log(err));

        toggle();
    }

    return(
    <Wrapper>
        <div>CONGRATULATIONS</div>
        <Form>
            <p>Save your score!</p>
            <input placeholder="NAME" ref={username}/>
            <button onClick={onClick}>Send</button>
        </Form>
    </Wrapper>
    );
}

const Wrapper = styled.div`
    width:fit-content;
    height:fit-content;
    position:fixed;
    padding:3rem;
    font-size:3rem;
    font-weight:bold;
    color:lime;
    border-radius:3rem;
    border : solid 10px lime;
    background-color:${props=>props.theme.mainBackground};
    filter:drop-shadow(0 0 1rem green);
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index : 10;
`;

const Form = styled.div`
    width:fit-content;
    height:3rem;
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

        :focus{
            border-bottom:solid 1px lime;
            border-top : none;
            border-left : none;
            border-right : none;
            outline:none;
        }
    }
`


export default ModalGameEnd;