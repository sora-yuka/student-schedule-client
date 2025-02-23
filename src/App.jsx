import { useState, Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import './App.css'


export default function App() {

    return (
        <Fragment>
            <BrowserRouter>
                <AuthProvider>
                    {/* <Nav /> */}
                    <Routes>
                        <Route path="/" element={ <div>Home page</div> } />
                        <Route path="*" element={ <div>Page Not Found</div> } />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </Fragment>
    )
}