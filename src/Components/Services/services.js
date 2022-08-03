import axios from "axios";

const APIpath = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function registerUser (body) {
    return axios.post(`${APIpath}/auth/sign-up`, body)
}

function loginUser(body) {
    return axios.post(`${APIpath}/auth/login`, body)
}

function todayHabits(setUp) {
    return axios.get(`${APIpath}/habits/today`, setUp)
}

export { registerUser, loginUser, todayHabits };