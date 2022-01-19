import axios from "axios";
import React , {useRef, useState} from "react";
import styled from "styled-components";

type ModalProp = {
    toggle : ()=>void;
}

const ModalContacts = ({toggle}:ModalProp)  => {
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const title = useRef<HTMLInputElement>(null);
    const content = useRef(null);
    

    const [feedback, setFeedback]=useState({
        name:"",
        email:"",
        title:"",
        content:""
    });

    const onChange = (e:any) => {
        setFeedback({
            ...feedback,
            [e.target.name]:e.target.value
        });
    }
    
    const onSubmit = () => {
        axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;application/json';
        axios({
            method:"post",
            url:`/api/feedback`,
            data:feedback
        }).then((res)=>{
            console.log(res.data);
            alert("Feedback has been sent");
        }).catch((err)=>{
            console.log(err);
            alert("Failed to send feedback.");
        })
        toggle();
    }

    return(   
        <Wrapper>
        <Form>
            <p>Contact me at : </p>
            <input placeholder="NAME" name="name" ref={name} maxLength={16} onChange={onChange}/>
            <input placeholder="EMAIL" name="email" ref={email} maxLength={40} onChange={onChange}/>
            <input placeholder="TITLE" name="title" ref={title} maxLength={40} onChange={onChange}/>
            <textarea placeholder="MESSAGE" name="content" ref={content} minLength={1} maxLength={300} onChange={onChange}/>
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

    @media (max-width: 991.98px) {
        min-width:90%;
        height:80vh;
    }
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
        display:block;
        width:500px;
        border-bottom:solid 1px grey;
        border-top : none;
        border-left : none;
        border-right : none;
        padding:0.5rem;
        color:grey;
        background-color:inherit;
        margin:1rem;

        :focus{
            color:lime;
            border-bottom:solid 1px lime;
            border-top : none;
            border-left : none;
            border-right : none;
            outline:none;
        }
    }

    textarea {
        display:block;
        width:500px;
        height:8rem;
        box-sizing: border-box;
        background-color:inherit;
        padding:0.5rem;
        margin:1rem;
        resize:none;
        color:grey;

        :focus {
            color: white;
            border-left:solid 1px lime;
            outline:none;
        }

        
    }
`


export default ModalContacts;
