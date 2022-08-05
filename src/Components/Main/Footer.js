import styled from "styled-components";
import { useContext, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Footer() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const percentage = userData.completed/userData.total*100;

    return (
        <FooterWrapper>
            <p onClick={() => navigate("/habitos")}>Hábitos</p>
            <div onClick={() => navigate("/hoje")}>
                <CircularProgressbar 
                    value={percentage}
                    text="Hoje"
                    styles={buildStyles({
                        textSize: '22px',
                        pathColor: '#FFFFFF',
                        textColor: '#FFFFFF',
                        trailColor: '#52B6FF', 
                    })}
                />
            </div>
            <p onClick={() => navigate("/historico")}>Histórico</p>
        </FooterWrapper>
    );
}

const FooterWrapper = styled.footer`
    background-color: #FFFFFF;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    bottom: 0;
    left: 0;
    position: fixed;

    p {
        color: #52B6FF;
        font-size: 18px;
        cursor: pointer;
    }

    div {
        background-color: #52B6FF;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        padding: 6px;
        margin-bottom: 48px;
        cursor: pointer;
    }
`