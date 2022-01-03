import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {GameState, HiveState, CellState, Level} from "../../modules/game";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { SocketContext } from "../../context/socket";
import { timeFormatter } from "../../utilities/timeformatter";
import { levelArray } from "../../utilities/Hivegenerator";
import {BsFillAlarmFill} from "react-icons/bs";

const Console = () => {
    const Game : GameState = useSelector((state:RootState) => state.game);
    const socket = useContext(SocketContext);

    socket.on("connect", ()=>{
        console.log(socket.id);
    });

    const [timer, setTimer] = useState('');

    useEffect(()=>{
        socket.on("timer", (data)=>{
            setTimer(timeFormatter(data.sec));
        })
    },[timer, socket]);

    return(
        <Wrapper>
            <HoneyContent>
                <Textbox>
                    <span>{Game.countHoney}</span>
                    <span> cells open. </span>
                    <span>{Game.hive.length-levelArray[Game.level-1].beeNum - Game.countHoney} left</span>
                </Textbox>
                <Progressbox>
                    <Progress width={Game.countHoney/(Game.hive.length-levelArray[Game.level-1].beeNum)}></Progress>
                </Progressbox>
            </HoneyContent>

            <BeeContent>
                <BeeTextbox>
                    <span>{Game.countFlag}</span>
                    <span> Flags used. </span>
                    <span>{levelArray[Game.level-1].beeNum } Bees. </span>
                </BeeTextbox>
                <Progressbox>
                    <BeeProgress width={Game.countFlag/(levelArray[Game.level-1].beeNum)}></BeeProgress>
                </Progressbox>
            </BeeContent>
            <Timer>
                <BsFillAlarmFill/> {timer}
            </Timer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width:50%;
    min-width : fit-content;
    height : fit-content;
    padding: 1rem 1rem;
    border-radius:0.5rem;
    display : flex;
    justify-content : space-evenly;
    align-items : center;
    background-color:${props=>props.theme.mainBackground};

    @media (max-width: 991.98px) {
        width:100%;
        margin-bottom:0.5rem;
    }
    
`;

const HoneyContent = styled.div`
    width: fit-content;
    height : fit-content;
    filter:drop-shadow(0 0 0.3rem black);
    margin-right:1rem;
`
const BeeContent = styled.div`
    width: fit-content;
    height : fit-content;
    filter:drop-shadow(0 0 0.3rem black);
    margin-right:1rem;
`

const Textbox = styled.div`
    width:100%;
    background-color:${props=>props.theme.mainBackground};
    display:flex;
    justify-content:center;
    align-items:center;

    span{
        margin:0.5rem;
        padding:0.5rem 0.1rem;
    }

    span:first-child{
        color: var(--darkYellow);
        font-size:1.2rem;
        font-weight:bolder;
    }

    span:nth-child(2){
        color: ${props=>props.theme.primaryText};
    }

    span:last-child{
        color: var(--yellowGrey);
        font-size:1.2rem;
        font-weight:bolder;
    }
    
`;

const BeeTextbox = styled.div`
    width:100%;
    background-color:${props=>props.theme.mainBackground};
    display:flex;
    justify-content:center;
    align-items:center;

    span{
        margin:0.5rem;
        padding:0.5rem 0.1rem;
    }

    span:first-child{
        color: green;
        font-size:1.2rem;
        font-weight:bolder;
    }

    span:nth-child(2){
        color: ${props=>props.theme.primaryText};
    }

    span:last-child{
        color: tomato;
        font-size:1.2rem;
        font-weight:bolder;
    }
    
`;

const Progressbox = styled.div`
    width:100%;
    border:solid 3px grey;
    background-color:grey;
`;

const Progress = styled.div<{width:number}>`
    width:${props=>props.width*100}%;
    height:0.5rem;
    background-color:var(--darkYellow);
`;



const BeeProgress = styled.div<{width:number}>`
    width:${props=>props.width*100}%;
    height:0.5rem;
    background-color:green;
`;

const Timer = styled.div`
    padding:0.5rem;
    border-radius:1rem;
    border : solid 0.2rem tomato;
    background-color:${props=>props.theme.mainBackground};
    font-size:1.2rem;
    font-weight:bolder;
    color:tomato;
    filter:drop-shadow(0 0 0.3rem black);
`;

export default React.memo(Console);