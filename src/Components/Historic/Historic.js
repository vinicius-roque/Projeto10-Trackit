import { CreateHabitWrapper } from "../Habits/styles";
import { MainWrapper } from "../Main/styles";
import TopBar from "../Main/TopBar";
import Footer from "../Main/Footer";

export default function Historic() {
    return (
        <>
            <TopBar />
            <MainWrapper>
                <CreateHabitWrapper>
                    <h2>Histórico</h2>
                </CreateHabitWrapper>
                <p>Em breve você poderá ver o seu histórico dos seus hábitos aqui!</p>
            </MainWrapper>
            <Footer />
        </>
    );
}