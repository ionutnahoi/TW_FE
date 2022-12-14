import React from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { makeStyles } from '@mui/styles'



export const Login = () => {
  const classes = useStyle()
  return (
    <div>
      <div className={classes.FormsContainer}>
        <RegisterForm />
        <LoginForm />
      </div>
    </div>
  )
}

const useStyle = makeStyles({
  FormsContainer: {
    margin: "50px",
    display: "flex"
  }
})