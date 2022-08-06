import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { checkHabit, todayHabits, uncheckHabit } from "../Services/services";
import dayjs from "dayjs";
import Checkmark from "../Main/assets/Checkmark.png";
import { MainWrapper } from "../Main/styles"
import TopBar from "../Main/TopBar";
import Footer from "../Main/Footer";
import { DayWrapper, ListWrapper, HabitsDetails, HabitsCheckmark, Colored } from "./styles";

export default function Today() {
    const {userData, setUserData} = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const setUp = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    useEffect(() => {
        todayHabits(setUp).then(answer => {
            setHabits({...answer.data});
            setUserData({
                ...userData, 
                completed : answer.data.filter(habit => habit.done).length,
                total : answer.data.length,
            });
        });
    }, [habits]);
    
    function translateDay(dayNumber) {
        let conversion;
        switch (dayNumber) {
            case 0: 
                conversion = "Domingo";
                break;
            case 1: 
                conversion = "Segunda";
                break;
            case 2: 
                conversion = "Terça";
                break;
            case 3: 
                conversion = "Quarta";
                break;
            case 4: 
                conversion = "Quinta";
                break;
            case 5: 
                conversion = "Sexta";
                break;
            default: 
                conversion = "Sábado";
        }
        return conversion;
    }

    function check(habitId) {
        checkHabit(habitId, setUp)
        .then(() => {
            setUserData({
                ...userData,
                completed: userData.completed + 1
            });
            setHabits({...habits});
        })
        .catch((error) => console.log(error)); 
    }

    function uncheck(habitId) {
        uncheckHabit(habitId, setUp)
        .then(() => {
            setUserData({
                ...userData,
                completed: userData.completed - 1
            });
            setHabits({...habits});
        })
        .catch((error) => console.log(error)); 
    }

    return (
        <>
            <TopBar />
            <MainWrapper>
                <DayWrapper>
                    <h2>{translateDay(dayjs().day())}, {dayjs().date()/dayjs().month()+1}</h2>
                    {
                        userData.completed > 0 ?
                        <span>{(userData.completed/userData.total*100).toFixed(0)}% dos hábitos concluídos</span> :
                        <p>Nenhum hábito concluído ainda</p>
                    }
                </DayWrapper>
                <ListWrapper>
                    {
                        habits.length === 0 ?
                        "" :
                        <HabitDetail habit={habits} check={check} uncheck={uncheck} />
                    }
                </ListWrapper>
            </MainWrapper>
            <Footer />
        </>
    );
}

function HabitDetail({ habits, check, uncheck }) {
    return (
        <>
            {Object.keys(habits).map(habitIndex => { 
                const habit = habits[habitIndex];
                return (
                <li key={habitIndex}>
                    <HabitsDetails>
                        <h3>{habit.name}</h3>
                        <p>Sequência atual: {habit.done ? <Colored green>{habit.currentSequence} dias</Colored> : <Colored>{habit.currentSequence} dias</Colored> }</p>
                        <p>Seu recorde: {(habit.currentSequence === habit.highestSequence && habit.highestSequence !== 0) ? <Colored green>{habit.highestSequence} dias</Colored> : <Colored>{habit.highestSequence} dias</Colored>}</p>
                    </HabitsDetails>
                    {habit.done ?
                        <HabitsCheckmark green onClick={() => {uncheck(habit.id)}}>
                            <img src={Checkmark} alt="checkmark icon" />
                        </HabitsCheckmark> :
                        <HabitsCheckmark onClick={() => {check(habit.id)}}>
                            <img src={Checkmark} alt="checkmark icon" />
                        </HabitsCheckmark>
                    }
                </li>
            )})}
        </>
    );
}