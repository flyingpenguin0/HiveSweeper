import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import {timeFormatter} from "../../utilities/timeformatter";

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
    axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;application/json';
    const [rank, setRank] = useState([]);
    const [level, setLevel] = useState("EASY");

    const onClick = (e : any) => {
        setLevel(e.target.name);
    }
    
    useEffect(()=>{
        axios({
            method:"get",
            url:`/api/level/${level}`
        }).then((res)=>{
            setRank(res.data);
        }).catch(err=>console.log(err));
    },[level]);

    return(<Wrapper>
        <ButtonBox>
            <p>Top 10</p>
            <div>
                <button name="EASY" onClick={onClick}>EASY</button>
                <button name="MEDIUM"  onClick={onClick}>MEDIUM</button>
                <button name="HARD"  onClick={onClick}>HARD</button>
            </div>
        </ButtonBox>
        {rank.length==0
            ? null
            : (<ul>
                {rank.map((record:Rank, i:number) => (
                <li key={i}>
                    <span className="rank">{i+1}</span>
                    <span className="name">{record.name}</span>
                    <span className="time">{timeFormatter(record.time)}</span>
                </li>
                ))}
            </ul>)
        }
    </Wrapper>);
}

const Wrapper = styled.div`
    width:700px;
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

    li{
        width:90%;
        display:flex;
        justify-content:space-between;

        span{
            font-size:1.5rem;
            font-weight:bold;
            padding:1rem;
        }
        .rank{
            color : tomato;
        }
        .name{
            color : ${props=>props.theme.primaryText};
        }
        .time{
            color : ${props=>props.theme.secondaryText};
        }
    }

    @media (max-width: 991.98px) { 
        width:450px;
        p {
            font-size:1rem;
        }
        li{
            span{
                font-size:0.8rem;
            }
        }
    }
`;

const ButtonBox = styled.div`
    display:flex;
    justify-content:space-between;
    width:90%;
    height:fit-content;
    margin:0.5rem; 
`;

export default ModalAwards;