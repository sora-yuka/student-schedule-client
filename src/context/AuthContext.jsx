import { useContext, createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const navigate = useNavigate()

    const baseUrl = "http://localhost:8000/api/v1/account/"

    useEffect(() => {
        async function checkAuth() {
            const response = await fetch(baseUrl + "check-auth/", {
                method: "GET",
                headers: { "Content-type": "application/json" },
                credentials: "include",
            })

            if (response.status === 401) {
                try {
                    const refresh_response = await refreshToken()

                    if (refresh_response.status === 400) {
                        setIsAuthenticated(false)
                        navigate("/login")
                    } else {
                        setIsAuthenticated(true)
                    }
                } catch (error) {
                    setIsAuthenticated(false)
                    navigate("/login")
                    console.error("Something went wrong while refreshing token: ", error)
                }
            } else if (response.ok) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
                navigate("/login")
            }
        }

        checkAuth()
    }, [ navigate ])

    async function refreshToken() {
        const response = await fetch(baseUrl + "refresh/", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
        })

        if (!response.ok) {
            console.log("Error occured while refreshing token: ", error)
        }

        return response
    }

    async function login(email, password) {
        const response = await fetch(baseUrl + "login/", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        })

        if (!response.ok) {
            setIsAuthenticated(false)
            throw new Error("User with given credentials not found")
        }

        setIsAuthenticated(true)
        return response
    }

    async function logout() {
        const response = await fetch(baseUrl + "logout/", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
        })

        setIsAuthenticated(false)
        return response
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)