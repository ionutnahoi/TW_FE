import axios from "axios"
import { store } from "../state/store"

const instance = () => {
    return axios.create({
        baseURL: 'http://localhost:8080/rents',
        headers: { 'Authorization': `Bearer ${store.getState().jwt.value}`, }
    });
}


export const extendRent = async (props) => {
    const response = await instance().put(`?id=${props.id}&period=${props.period}`)
        .catch(error => {
            if (error.response.status === 400) {
                alert("Extend unsuccessful")
            }
        })

    if (response.status === 204) {
        alert("Can no longer extend the rent for this movie")
    }

    if (response.status === 200) {
        return response.data
    }
    return null
}


export const addRent = async (props) => {
    const response = await instance().post(`?userId=${props.userId}&movieId=${props.movieId}&period=${props.period}`)
        .catch(error => {
            if (error.response.status === 400) {
                alert("Rent unsuccessful")
            }
        })

    if (response.status === 201) {
        return response.data
    }
    return null
}


export const getDateWhenMovieWillBeAvailable = async (props) => {
    const response = await instance().get(`/availableDate?movieId=${props.movieId}`)

    if (response.status === 200) {
        return response.data
    }
    if (response.status === 204) {
        return "Is available"
    }
    return null
}
