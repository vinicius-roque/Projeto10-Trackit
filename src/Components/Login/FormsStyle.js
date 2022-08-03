import logo from "../Main/assets/Logo.png";
import styled from "styled-components";

function Brand() {
    return (
        <Logo src={logo} alt="Logo" />
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Logo = styled.img`
    width: 180px;
    height: 178px;
    margin: 68px 0 33px 0;
`
const Form = styled.div`
    width: 303px;
    display: flex;
    align-items: center;
    flex-direction: column;

    p {
        font-family: 'Lexend Deca';
        color: #52B6FF;
        font-size: 14px;
        text-decoration: underline;
        cursor: pointer;
    }

    button {
        background-color: #52B6FF;
        color: #FFFFFF;
        width: 100%;
        height: 45px;
        font-size: 20px;
        border-radius: 5px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        cursor: pointer;
    }
`
export { Brand, Wrapper, Form };
