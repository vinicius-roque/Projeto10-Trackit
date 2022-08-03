import { registerUser } from "../Services/services";
import { Brand, Wrapper, Form } from "./FormsStyle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);

    function holdForm({ name, value }) {
        setForm({...form, [name]: value,});
    }

    function sendForm(e) {
        e.preventDefault();
        setLoading(!loading);
        const request = registerUser(form)

        request.then(answer => {
            navigate('/');
        });

        request.catch(answer => {
            alert("Não foi possível cadastrá-lo, revise os dados!");

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
                <input 
                    type="url" 
                    placeholder="foto"
                    name="image"
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
                    <button onClick={sendForm}>Cadastrar</button> 
                }
                <p onClick={() => navigate('/')}>Já tem uma conta? Faça login</p>
            </Form>
        </Wrapper>
    );
}