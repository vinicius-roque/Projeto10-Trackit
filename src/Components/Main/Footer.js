import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Footer() {
    const { userData } = useContext(UserContext);
    const percentage = userData.completed/userData.total*100;
    const navigate = useNavigate();

    return (
        <FooterWrapper>
            <p onClick={() => navigate("/habitos")}>Hábitos</p>
            <div onClick={() => navigate("/hoje")}>
                <CircularProgressbar 
                value={percentage} 
                text="Hoje"
                styles={buildStyles({
                    textSize: '22px',
                    pathColor: `#FFFFFF`,
                    textColor: '#FFFFFF',
                    trailColor: '#52B6FF',
                })}
                />
            </div>
            <p onClick={() => navigate("/historico")}>Histórico</p>
        </FooterWrapper>
    )
}

const FooterWrapper = styled.footer`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #FFFFFF;
    position: fixed;
    bottom: 0;
    left: 0;
    
    div {
        width: 90px;
        height: 90px;
        padding: 6px;
        margin-bottom: 48px;
        background-color: #52B6FF;
        border-radius: 50%;
        cursor: pointer;
    }
    
    p {
        font-size: 18px;
        color: #52B6FF;
        cursor: pointer;
    }
`;