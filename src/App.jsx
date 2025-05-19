import {Fragment} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import './App.css'

import HomePage from './pages/HomePage'
import NotFound from './pages/not-found/NotFound'
import Login from './pages/login/Login'
import NewsDetail from './pages/news/components/NewsDetail'


export default function App() {

    return (
        <Fragment>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={ <HomePage/> }/>
                        <Route path="/login" element={ <Login/> }/>
                        <Route path="/news/:id"  element={ <NewsDetail/> }/>
                        <Route path="*" element={ <NotFound/> }/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </Fragment>
    )
}