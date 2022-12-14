import { createSlice } from "@reduxjs/toolkit";

export const jwtSlice = createSlice({
    name: "jwt",
    initialState: { value: null },
    reducers: {
        authenticate: (state, action) => {
            state.value = action.payload
        },
        deauthenticate: (state) => {
            state.value = null
        }
    }

})

export const { authenticate, deauthenticate } = jwtSlice.actions

export default jwtSlice.reducer