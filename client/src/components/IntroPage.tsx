import React from "react";
import {Link} from "react-router-dom";

const IntroPage : React.FC = () => {
    return(
        <div>
            <Link to="/play"><button>Start Game</button></Link>
        </div>
    )
}

export default IntroPage;