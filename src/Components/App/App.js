import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../Main/globalStyle";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Habits from "../Habits/Habits";
import Today from "../Today/Today";
import Historic from "../Historic/Historic";
import UserContext from "../../Contexts/UserContext";

export default function App() {
	const [userData, setUserData] = useState("");

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={{userData, setUserData}}>
                <BrowserRouter>
                    <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/cadastro" element={<Register />} />
                            <Route path="/habitos" element={<Habits />} />
                            <Route path="/hoje" element={<Today />} />
                            <Route path="/historico" element={<Historic />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}