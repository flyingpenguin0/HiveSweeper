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
        axios.get("/api",{withCredentials: true}).then((res)=>{
            console.log(res.data);
            setRank(res.data);
        }).catch(err=>console.log(err));
    },[]);

    return(<Wrapper>
        <p>Rank</p>
        {rank.length==0
            ? <div>Empty</div>
            : (<ul>
                {rank.map((record:Rank) => <li><span>{record.name}</span><span>{record.time}</span></li>)}
            </ul>)
        }
    </Wrapper>);
}

const Wrapper = styled.div`
    width:50%;
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

    p{
        color:yellow;
        font-size:2.5rem;
        text-align:center;
    }

    ul {
        display:flex;
        flex-direction:column
    }
`;


export default ModalAwards;