import React, {useRef, useState, useContext} from "react";
import styled from "styled-components";
import axios from "axios";
import {SocketContext} from "../../context/socket";
import {RootState} from "../../modules/index";
import { useSelector } from "react-redux";

type ModalProp = {
    toggle : () => void;
    level : string;
}

const ModalGameEnd = ({toggle, level} : ModalProp )  => {
    const [name, setName] = useState('');
    const nameInput = useRef<HTMLInputElement>(null);
    const socket = useContext(SocketContext);
    const game = useSelector((state:RootState) => state.game);
    //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;application/json';
    
    const onChange = (e: { target: { value: string; }; }) : void => {
        let newName : string = e.target.value;
        setName(newName);
    }

    const onReset = () : void => {
        setName('');
    }
    const getLevelString = (level:number) : string =>{
        let array = ["EASY","MEDIUM","HARD","EXTREME"];
        return array[level-1];
    }

    const onClick = () : void =>{
        let data = {
            name:name,
            level:getLevelString(game.level)
        }
        socket.emit("createRecord", data );
        onReset();
        toggle();
    }
    socket.on("record_succ", (data)=>{console.log(data.game)});
    socket.on("record_err", (data)=>{console.log(data.err)});

    return(
    <Wrapper>
        <div>CONGRATULATIONS</div>
        <Form>
            <p>Save your score!</p>
            <input placeholder="NAME" onChange={onChange} ref={nameInput} value={name} minLength={1} maxLength={10}/>
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