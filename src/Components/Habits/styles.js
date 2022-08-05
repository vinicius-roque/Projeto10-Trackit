import styled from "styled-components";

const CreateHabitWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 20px;

    button {
        background-color: #52B6FF;
        color: #FFFFFF;
        width: 40px;
        height: 35px;
        font-size: 27px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }
`

const DaysWrapper = styled.div`
    margin-bottom: 30px;
    display: flex;

    span, b {
        width: 30px;
        height: 30px;
        font-size: 20px;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 4px;
        cursor: pointer;
    }

    b {
        background-color: #CFCFCF;
        color: #FFFFFF
    }

    span {
        color: #D4D4D4;
    }
`

const createHabit = styled.div`
    background-color: #FFFFFF;
    width: 100%;
    height: 180px;
    border-radius: 5px;
    padding: 16px 18px;
    margin-bottom: 30px;
`