import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {GameState, HiveState, CellState, Level} from "../../modules/game";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";
import { socket, SocketContext } from "../../context/socket";
import { timeFormatter } from "../../utilities/timeformatter";
import { levelArray } from "../../utilities/Hivegenerator";

const Console = () => {
    const Game : GameState = useSelector((state:RootState) => state.game);
    const socket = useContext(SocketContext);

    const [timer, setTimer] = useState('');

    useEffect(()=>{
        socket.on("timer", (data)=>{
            console.log(timeFormatter(data.sec));
            setTimer(timeFormatter(data.sec));
        })
    },[timer]);

    return(
        <Wrapper>
            <div>Total :
                <span>{Game.hive.length-levelArray[Game.level-1].beeNum}</span>
            </div>
            <div>Open : <span>{Game.countHoney}</span>
            </div>
            <div>Bees : 
                <span>
                    {levelArray[Game.level-1].beeNum}
                </span>
            </div>
            <div>Flags : <span>{Game.countFlag}</span>
            </div>
            <div>Timer : <span>{timer}</span>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width : 50%;
    height : 5vh;
    display : flex;
    justify-content : space-evenly;
    align-items : center;
    
`;

export default Console;