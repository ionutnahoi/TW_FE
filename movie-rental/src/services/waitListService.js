import axios from "axios"
import { store } from "../state/store"

const instance = () => {
    return axios.create({
        baseURL: 'http://localhost:8080/waitLists',
        headers: { 'Authorization': `Bearer ${store.getState().jwt.value}`, }
    });
}


export const addWaitList = async (props) => {
    const response = await instance().post(`?userId=${props.userId}&movieId=${props.movieId}`)
        .catch(error => {
            if (error.response.status === 400) {
                alert("Add to waiting List unsuccessful")
            }
        })

    if (response.status === 201) {
        return response.data
    }
    return null
}

export const getWaitListForUser = async (props) => {
    const response = await instance().get(`?userId=${props.userId}`)

    if (response.status === 200) {
        return response.data
    }
    return null
}

export const deleteWaitList = async (props) => {
    const response = await instance().delete(`?id=${props.id}`)

    if (response.status === 200) {
        alert("Movie deleted from waiting list successfully")
    }
    if (response.status === 204) {
        alert("Movie deleted from waiting list unsuccessfully")
    }
    return null
}
