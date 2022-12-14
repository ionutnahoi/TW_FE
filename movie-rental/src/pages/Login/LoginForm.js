/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles'
import { authenticateLogin } from '../../services/userService'
import { useDispatch } from "react-redux"
import { login } from "../../state/slices/userSlice"
import { authenticate } from '../../state/slices/jwtSlice';


export const LoginForm = () => {
    const [userDataInput, setUserDataInput] = useState({ username: "", password: "" });
    const dispatch = useDispatch()
    const classes = useStyle()



    const HandleSubmit = e => {
        e.preventDefault();

        const fetchData = async () => {
            doAction(await authenticateLogin(userDataInput))
        }

        fetchData()
    }

    const doAction = (result) => {
        dispatch(authenticate(result.jwt));
        dispatch(login(result.user));
    };


    return (
        <form className={classes.LoginForm} onSubmit={HandleSubmit}>
            <Paper elevation={5}>


                <div className={classes.FormGroup}><h2 >Login</h2></div>
                <div className={classes.FormGroup}>
                    <TextField
                        id="loginEmailField"
                        label="Email"
                        type="email"
                        onChange={e => setUserDataInput({ ...userDataInput, username: e.target.value })}
                    />
                </div>
                <div className={classes.FormGroup}>
                    <TextField
                        id="loginPasswordField"
                        label="Password"
                        type="password"
                        onChange={e => setUserDataInput({ ...userDataInput, password: e.target.value })}
                    />
                </div>
                <div className={classes.FormGroup}><Button type="submit" variant="outlined">Login</Button></div>
                <br />

            </Paper>
        </form>
    )
}

const useStyle = makeStyles({
    LoginForm: {
        width: "fit-content",
        height: "fit-content",
        marginLeft: "5%",
        marginRight: "auto"
    },

    FormGroup: {
        margin: "10px"
    }
})
