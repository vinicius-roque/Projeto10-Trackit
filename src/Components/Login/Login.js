import { Brand, Wrapper, Form } from "./FormsStyle";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { loginUser } from "../Services/services";
import { ThreeDots } from "react-loader-spinner";

export default function Login() {
    const { setUserData } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    function holdForm({ name, value }) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    function sendForm(e) {
        e.preventDefault();
        setLoading(true);
        const request = loginUser(form);

        request
        .then(answer => {
            setUserData(answer.data);
            navigate('/hoje');
        })
        .catch(() => {
            alert("Não foi possível fazer login, tente novamente!");
            setLoading(false);
        });
    }

    return (
        <Wrapper>
            <Brand />
            <Form onSubmit={sendForm}>
                <input
                    type="email" 
                    placeholder="email" 
                    name="email"
                    onChange={(e) => {
                        holdForm({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }}
                    required
                    disabled={loading}
                 />
                <input
                    type="password" 
                    placeholder="senha" 
                    name="password"
                    onChange={(e) => {
                        holdForm({
                            name: e.target.name,
                            value: e.target.value
                        })
                    }}
                    required
                    disabled={loading}
                 />
                 {loading ?
                    <button><ThreeDots color="#FFFFFF" height={40} width={40} /></button> :
                    <button>Entrar</button>
                 }                
                <p onClick={() => navigate('/cadastro')}>Não tem uma conta? Cadastre-se!</p>
            </Form>
        </Wrapper>
    )
}