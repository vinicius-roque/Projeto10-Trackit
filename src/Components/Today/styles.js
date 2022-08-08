import styled from "styled-components";

const DayWrapper = styled.div`
    width: 100%;

    p {
        color: #BABABA;
        font-size: 18px;
        margin-top: 5px;
    }

    span {
        color: #8FC549;
        font-size: 18px;
        display: block;
        margin-top: 5px;
    }
`

const ListWrapper = styled.ul`
    width: 100%;
    margin-top: 28px;

    li {
        background-color: #FFFFFF;
        width: 100%;
        height: 94px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        margin-bottom: 10px;
    }
`

const HabitsCheckmark = styled.div`
    background-color: ${props => props.green ? "#8FC549" : "#EBEBEB"};
    width: 69px;
    height: 69px;
    border: ${props => props.green ? "" : "1px solid #E7E7E7;"};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
        width: 35px;
        height: 28px;
    }
`

const HabitsDetails = styled.div`
    h3 {
        margin-bottom: 7px;
    }

    p {
        font-size: 13px;
        line-height: 16px;
    }
`

const Colored = styled.span`
    color: ${props => props.green ? "#8FC549" : "#BABABA"};
`

export { DayWrapper, ListWrapper, HabitsCheckmark, HabitsDetails, Colored };