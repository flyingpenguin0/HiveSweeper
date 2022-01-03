import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

type ModalProp = {
    isToggled : boolean
} 

type Rank = {
    index : number,
    name : string,
    level : string,
    time : number
}

const ModalAwards = ()  => {
    const [rank, setRank] = useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:8000/api/1",{withCredentials: true}).then((res)=>{
            console.log(res.data);
            setRank(res.data);
        }).catch(err=>console.log(err));
    },[]);

    return(<Wrapper>
        {rank.length==0
            ? <div>Empty</div>
            : rank.map((record:Rank)=> <li><span>{record.name}</span><span>{record.time}</span></li> )
        }
    </Wrapper>);
}

const Wrapper = styled.div`
    width:50%;
    height:70vh;
    position:fixed;
    background-color:white;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index : 10;
`;


export default ModalAwards;