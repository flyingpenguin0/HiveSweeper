import React from "react";
import styled from "styled-components";
import {GameState, HiveState, CellState, Level} from "../../modules/game";
import { useSelector } from "react-redux";
import { RootState } from "../../modules";

const Console = () => {
    const Game : GameState = useSelector((state:RootState) => state.game);

    return(
        <Wrapper>
            <div>Total :
                <span>{Game.hive.length}</span>
            </div>
            <div>Open : <span>{Game.countHoney}</span>
            </div>
            <div>Bees : 
                <span>
                    {Game.level==1
                        ? 15
                        : Game.level==2
                            ? 30
                            : Game.level==3
                                ? 45
                                : Game.level==4
                                    ? 90
                                    : 15}
                </span>
            </div>
            <div>Flags : <span>{Game.countFlag}</span>
            </div>
            <div>Timer 00:00:00</div>
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