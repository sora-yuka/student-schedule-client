import {Fragment} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import './App.css'

import HomePage from './pages/HomePage'
import NotFound from './pages/not-found/NotFound'
import Login from './pages/login/Login'

import Schedule from './pages/schedule/Schedule'
import News from './pages/news/News'
import NewsDetail from './pages/news-detail/NewsDetail'
import Course from './pages/course/Course'
import CourseDetail from './pages/course-detail/CourseDetail'
import Chat from './pages/chat/Chat'


export default function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={ <HomePage/> }>
                            <Route index element={ <Schedule/> } />
                            <Route path="/news" element={ <News/> } />
                            <Route path="/news/:newsId" element={ <NewsDetail/> } />
                            <Route path="/course" element={ <Course/> } />
                            <Route path="/course/:courseId" element={ <CourseDetail/> } />
                            <Route path="/chat" element={ <Chat/> } />
                        </Route>

                        <Route path="/login" element={ <Login/> } />
                        <Route path="*" element={ <NotFound/> } />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </Fragment>
    )
}