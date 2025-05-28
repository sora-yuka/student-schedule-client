import { useState, useEffect, useCallback, Fragment } from 'react'
import { useParams } from 'react-router-dom'

import CourseDetailDesktop from './components/CourseDetail.desktop'
import './CourseDetail.css'


export default function CourseDetail() {
    const [courseItems, setCourseItems] = useState(null)
    const params = useParams()

    const fetchCourse = useCallback(async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_ENDPOINT + `course/${params.courseId}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                }
            })

            if (response.status === 200) {
                const data = await response.json()
                setCourseItems(data)
            }
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        fetchCourse()
    }, [ ])

    return (
        <div className="course-detail">
            { courseItems && (
                <div className="container">
                    <CourseDetailDesktop courseItems={ courseItems } />
                </div>
            ) }
        </div>
    )
}