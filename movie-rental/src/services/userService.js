import axios from "axios"
import jwt_decode from "jwt-decode";
import { store } from "../state/store"

const instance = () => {
    return axios.create({
        baseURL: 'http://localhost:8080/users',
        headers: { 'Authorization': `Bearer ${store.getState().jwt.value}`, }
    });
}



export const authenticateLogin = async (props) => {
    const response = await axios.post("http://localhost:8080/authenticate/login", props).catch(error => {
        if (error.response.status === 403) {
            alert("Wrong data inserted!")
        }
    })

    if (response.status === 200) {
        const payload = jwt_decode(response.data.jwt)
        return { user: { id: payload.id, name: payload.name, email: payload.sub }, jwt: response.data.jwt }
    }

    return null
}


export const authenticateRegister = async (props) => {
    const response = await axios.post("http://localhost:8080/authenticate/register", props)

    if (response) {
        if (response.status === 200) {
            const payload = jwt_decode(response.data.jwt)
            return { user: { id: payload.id, name: payload.name, email: payload.sub }, jwt: response.data.jwt }
        }
    }

    return null
}

export const addMovie = async (props) => {
    const response = await instance().post(`?id=${props.id}`, props.movieInfo)
        .catch(error => {
            if (error.response.status === 400) {
                alert("Wrong data inserted!")
            }
        })
    if (response) {
        if (response.status === 201) {
            return response.data
        }
        if (response.status === 200) {
            return response.data
        }
    }

    return null
}

export const getMyMovies = async (props) => {
    const response = await instance().get(`/myMovies?id=${props.id}`)
    if (response.status === 200) {
        return response.data
    }

    return null

}

export const getMyRented = async (props) => {
    const response = await instance().get(`/myRented?id=${props.id}`)
    if (response.status === 200) {
        return response.data
    }

    return null
}