import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsFillAwardFill, BsFillQuestionCircleFill, BsFillEnvelopeFill, BsGithub } from "react-icons/bs";

type NavProp = {
    toggle : (num:number) => void
    clearModal : () => void
}

const Navbar = ({toggle, clearModal} : NavProp) => {
    return(
        <Wrapper>
            <Link to="/intro" onClick={()=>clearModal()}>HiveSweeper</Link>
            <Content>
                <BsFillQuestionCircleFill onClick={()=>toggle(0)}/>
                <BsFillAwardFill onClick={()=>toggle(1)}/>
                <BsFillEnvelopeFill onClick={()=>toggle(2)}/>
                <a href="https://github.com/flyingpenguin0/HiveSweeper" target="_blank" rel="noreferrer noopener"><BsGithub/></a>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height:fit-content;
    padding:0.3rem 1rem;
    background-color:${props=>props.theme.mainBackground};
    display:flex;
    justify-content:space-between;
    align-items:center;

    a{
        color:var(--darkYellow);
        font-size:1.5rem;
        font-weight:bolder;
        text-decoration:none;
        z-index:6;

        :active{
            color:var(--darkYellow);
            text-decoration:none;
        }
    }

    @media (min-width: 991.98px) { 
        padding:0 120px;
    }
`;

const Content = styled.div`
    width:fit-content;
    display:flex;
    justify-content:space-around;
    
    svg{
        z-index:6;
        width:2.5rem;
        height:2.5rem;
        padding:0.5rem;
        color:var(--darkYellow);

        :hover{
            cursor:pointer;
            color:var(--lightYellow);
        }
    }
    
`

export default Navbar;