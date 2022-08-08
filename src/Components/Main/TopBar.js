import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <TopWrapper>
            <h1 onClick={() => navigate("/hoje")}>TrackIt</h1>
            <img src={userData.image} alt="Sponge bob" />
        </TopWrapper>
    )
}

const TopWrapper = styled.nav`
    width: 100%;
    height: 70px;
    padding: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    
    h1 {
        font-family: 'Playball';
        font-size: 40px;
        color: #FFFFFF;
        cursor: pointer;
    }
    
    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`;