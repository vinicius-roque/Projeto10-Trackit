import { Brand, Wrapper, Form } from "./FormsStyle";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { loginUser } from "../Services/services";
import { ThreeDots } from "react-loader-spinner";

export default function Login() {
    const navigate = useNavigate();
    
    const { setUserData } = useContext(UserContext);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);

    function holdForm({ name, value }) {
        setForm({...form, [name]: value});
    }

    function sendForm(e) {
        e.preventDefault();
        setLoading(!loading);
        const request = loginUser(form);

        request.then(answer => {
            setUserData(answer.data);
            navigate('/hoje');
        });

        request.catch(answer => {
            alert("Não foi possível fazer login, revise os dados!");

            window.location.reload();

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
                    disabled={loading ? true : false}
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
                    disabled={loading ? true : false}
                />
                {loading ?
                    <button><ThreeDots color="#FFFFFF" width={40} height={40} /></button> :
                    <button onClick={sendForm}>Entrar</button>
                }
                <p onClick={() => navigate('/cadastro')}>Não tem uma conta? Cadastre-se!</p>
            </Form>
        </Wrapper>
    );
}