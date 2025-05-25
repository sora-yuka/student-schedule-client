import { useState, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Button from '../../components/button/Button'

import './Login.css'


export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)
    
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()

        await toast.promise(
            login(email, password),
            {
                loading: "Loading...",
                success: "Successfully logged in!",
                error: "Wrong email or password."
            },
            {
                error: {
                    duration: 2500
                }
            }
        )

        setTimeout(() => {
            navigate("/")
        }, 1700)

    }, [ email, password, login, navigate ])

    return (
        <div className="login">
            <Toaster />
            <div className="login-container">
                <div className="login__row">
                    <div className="login__content">
                        <h2 className="login__headline">Hello again 👋</h2>
                        <form className="login__form" onSubmit={ handleSubmit }>
                            <input 
                                type="text" 
                                className="login__input" 
                                placeholder="Email"
                                value={ email }
                                onChange={ (event) => { setEmail(event.target.value) } }
                            />
                            <input 
                                type={ !showPassword ? "password" : "text" } 
                                className="login__input"
                                placeholder="Password"
                                value={ password }
                                onChange={ (event) => { setPassword(event.target.value) } }
                            />
                            <br />
                            <label htmlFor="control" className="login__show-password">
                                <input 
                                    type="checkbox" 
                                    id="control" 
                                    checked={ showPassword }
                                    className="show-password__checkbox"
                                    onChange={ () => { setShowPassword(!showPassword) } }
                                />
                                Показать пароль
                            </label>
                            <br />
                            <Button className="btn__submit">
                                Отправить
                            </Button>
                        </form>
                    </div>
                    <div className="login__background" />
                </div>
            </div>
        </div>
    )
}