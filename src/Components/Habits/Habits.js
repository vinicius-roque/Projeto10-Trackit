import TopBar from "../Main/TopBar";
import Footer from "../Main/Footer";
import { MainWrapper } from "../Main/styles";
import { useContext, useState, useEffect, useDebugValue } from "react";
import UserContext from "../../Contexts/UserContext";
import dayjs from "dayjs";
import { CreateHabitWrapper, DaysWrapper, CreateHabit, HabitsWrapper, ActionWrapper } from "./styles";
import { createHabit, deleteHabit, allHabits } from "../Services/services";
import { ThreeDots } from "react-loader-spinner";

export default function Habits() {
    const [creatingHabit, setCreatingHabit] = useState(false);
    const [form, setForm] = useState({
        name: ""
    });

    const { userData, setUserData } = UserContext(UserContext);
    const [habitDays, setHabitDays] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const setUp = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };
    const [allHabits, setAllHabits] = useState([]);
    const allDays = [
        {
            index: 0,
            letter: "D"
        },
        {
            index: 1,
            letter: "S"
        },
        {
            index: 2,
            letter: "T"
        }, 
        {
            index: 3,
            letter: "Q"
        },
        {
            index: 4,
            letter: "Q"
        },
        {
            index: 5,
            letter: "S"
        },
        {
            index: 6,
            letter: "S"
        }
    ]

    useEffect(() => {
        allHabits(setUp).then(answer => {
            setAllHabits(answer.data);
        });
    }, [loading, deleting]);

    function holdForm({ name, value }) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    function sendForm(e) {
        e.preventDefault();
        setLoading(!loading);
        const body = {
            ...form,
            days: habitDays.sort(),
        }

        const request = createHabit(body, setUp);

        request
        .then(() => {
            if(habitDays.includes(dayjs().day())) {
                setUserData({
                    ...userData,
                    total: userData.total + 1
                });
            }

            setCreatingHabit(false)
            setLoading(false);
            setHabitDays([]);
            setForm({
                name: ""
            });
        })
        .catch(() => {
            alert("Tivemos um problema para criar seu hábito!");
            setLoading(false);
        });
    }

    return (
        <>
            <TopBar />
            <MainWrapper>
                <CreateHabitWrapper>
                    <h2>Meus hábitos</h2>
                    <button onClick={() => setCreatingHabit(true)}>+</button>
                </CreateHabitWrapper>
                {creatingHabit ?
                <CreateHabit>
                    <input
                        type="text"
                        placeholder="nome do hábito"
                        name="name"
                        onChange={(e) => {
                            holdForm({
                                name: e.target.name,
                                value: e.target.value
                            })
                        }}
                        value={form.name}
                        required
                        disabled={loading ? true : false}
                    />
                    <Days allDays={allDays} habitDays={habitDays} setHabitDays={setHabitDays} loading={loading}/>
                    <ActionWrapper>
                        {loading ?
                            <>
                                <span style={{opacity: 0.7}}>Cancelar</span>
                                <button><ThreeDots color="#FFFFFF" width={40} height={40} /></button>
                            </> :
                            <>
                                <span onClick={() => setCreatingHabit(false)}>Cancelar</span>
                                <button onClick={sendForm}>Salvar</button>
                            </>
                        }
                    </ActionWrapper>
                </CreateHabit> :
                "" }
                { allHabits.length === 0 ?
                    <p>Você não tem nenhum hábito cadatrado ainda. Adicione um hábito para começar a trackear!</p> :
                    allHabits.map((habit, index) => <HabitsList key={index} habit={habit} deleting={deleting} setDeleting={setDeleting} allDays={allDays} />)
                    }
            </MainWrapper>
            <Footer />
        </>
    );
}

function Days({ allDays, habitDays, setHabitDays, loading }) {
    function selectHabitDay(dayNumber) {
        if(loading) {
            return
        }
        if(habitDays.includes(dayNumber)) {
            const newDays = removeItem(habitDays, dayNumber);
            setHabitDays(newDays);
            return
        }
        setHabitDays([...habitDays, dayNumber]);
        return
    }

    function removeItem(list, value) {
        const index = list.indexOf(value);
        if (index > -1) {
            list.splice(index, 1);
        }
        return [...list];
    }

    function renderBoxDay(dayObj) {
        if (habitDays === undefined) {
            return <span key={dayObj.index} onClick={() => selectHabitDay(dayObj.index)}>{dayObj.letter}</span>
        }
        return habitDays.includes(dayObj.index) ?
        <b key={dayObj.index} onClick={() => selectHabitDay(dayObj.index)}>{dayObj.letter}</b> :
        <span key={dayObj.index} onClick={() => selectHabitDay(dayObj.index)}>{dayObj.letter}</span>
    }

    return (
        <DaysWrapper>
            {allDays.map(day => renderBoxDay(day))}
        </DaysWrapper>
    );
}

function HabitsList({ allDays, habit, deleting, setDeleting }) {
    const { userData, setUserData } = useContext(UserContext);
    const setUp = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    function deleteItem() {
        const confirming = window.confirm(`Você quer deletar o hábito ${habit.name}?`);
        if (confirming) {
            if(habit.days.includes(dayjs().day())) {
                setUserData({
                    ...userData,
                    total: userData.total - 1
                });
            }
            deleteHabit(habit.id, setUp).then(() => {
                setDeleting(!deleting);
            });
        }
    }

    return (
        <>
            <HabitsWrapper>
                <h3>{habit.name}</h3>
                <DaysWrapper>
                    {allDays.map(day => {
                        return <Day key={day.index} habitDays={habit.days} dayObj={day} />
                    })}
                </DaysWrapper>
                <ion-icon name="trash-outline" onClick={deleteItem}></ion-icon>
            </HabitsWrapper>
        </>
    );
}

function Day({ dayObj, habitDays }) {
    function renderBoxDay() {
        if(habitDays.length === 0) {
            return <span key={dayObj.index}>{dayObj.letter}</span>
        }
        return habitDays.includes(dayObj.index) ?
        <b key={dayObj.index}>{dayObj.letter}</b> :
        <span key={dayObj.index}>{dayObj.leetter}</span>
    }

    return renderBoxDay();
}