import TopBar from "../Main/TopBar";
import Footer from "../Main/Footer";
import { MainWrapper } from "../Main/styles";
import { useContext, useState, useEffect } from "react";
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
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    const [habitDays, setHabitDays] = useState([]);
    const setUp = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };
    const [allHabit, setAllHabit] = useState([]);
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
        },
    ]

    useEffect(() => {
        allHabits(setUp).then(answer => {
            setAllHabit(answer.data);
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
            if (habitDays.includes(dayjs().day())) {
                setUserData({
                    ...userData,
                    total : userData.total + 1,
                });
            }
            setLoading(false);
            setCreatingHabit(false);
            setHabitDays([]);
            setForm({
                name: "",
            });
        })
        .catch(() => {
            alert("Não foi possível criar este hábito");
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
                    <Days allDays={allDays} habitDays={habitDays} setHabitDays={setHabitDays} loading={loading} />
                    <ActionWrapper>
                        {loading ?
                            <>
                                <span style={{opacity: 0.7}}>Cancelar</span>
                                <button><ThreeDots color="#FFFFFF" height={40} width={40} /></button>
                            </> :
                            <>
                                <span onClick={() => setCreatingHabit(false)}>Cancelar</span>
                                <button onClick={sendForm}>Salvar</button>
                            </>
                        }
                    </ActionWrapper>
                </CreateHabit> :
                ""
                }
                { allHabit.length === 0 ?
                    <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> :
                    allHabit.map((habit, index) => <HabitsList key={index} allDays={allDays} habit={habit} deleting={deleting} setDeleting={setDeleting} />)
                }
                
            </MainWrapper>
            <Footer />
        </>
    )
}

function Days({ allDays, habitDays, setHabitDays, loading }) {
    function selectHabitDay(dayNumber) {
        if (loading) {
            return
        }

        if (habitDays.includes(dayNumber)) {
            const newDays = removeItem(habitDays, dayNumber);
            setHabitDays(newDays);
            return
        }

        setHabitDays([...habitDays, dayNumber]);
        return
    }

    function removeItem(array, value) {
        const index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }

        return [...array]
    }

    function renderDayBox(dayObj) {
        if (habitDays === undefined) {
            return <span key={dayObj.index} onClick={() => selectHabitDay(dayObj.index)}>{dayObj.letter}</span>
        }
        return habitDays.includes(dayObj.index) ?
        <b key={dayObj.index} onClick={() => selectHabitDay(dayObj.index)}>{dayObj.letter}</b> :
        <span key={dayObj.index} onClick={() => selectHabitDay(dayObj.index)}>{dayObj.letter}</span>
    }

    return (
    <DaysWrapper>
        {allDays.map(day => renderDayBox(day))}
    </DaysWrapper>
    )
}

function HabitsList({ allDays, habit, deleting, setDeleting }) {
    const { userData, setUserData } = useContext(UserContext);
    const setUp = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    };

    function deleteItem() {
        const confirmation = window.confirm(`Você quer deletar o hábito ${habit.name}?`);
        if (confirmation) {
            if (habit.days.includes(dayjs().day())) {
                setUserData({
                    ...userData,
                    total : userData.total - 1,
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
                        return <Day key={day.index} dayObj={day} habitDays={habit.days} />
                    })}
                </DaysWrapper>
                <ion-icon name="trash-outline" onClick={deleteItem}></ion-icon>
            </HabitsWrapper>
        </>
    )
}

function Day({ dayObj, habitDays }) {
    function renderDayBox() {
        if (habitDays.length === 0) {
            return <span key={dayObj.index}>{dayObj.letter}</span>
        }
        return habitDays.includes(dayObj.index) ?
        <b key={dayObj.index}>{dayObj.letter}</b> :
        <span key={dayObj.index}>{dayObj.letter}</span>
    }

    return renderDayBox()
}