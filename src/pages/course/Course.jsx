import { Fragment, useState, useEffect, useCallback } from 'react'
import NoContent from '../../components/no-content/NoContent.jsx'

import './Course.css'


export default function Course() {
    const [course, setCourse] = useState(null)

    const fetchCourse = useCallback(async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_ENDPOINT + "course/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                }
            })
    
            if (response.status === 200) {
                const data = await response.json()
                // setCourse(data)
            }
        } catch(error) {
            console.log(error)
        }
    })

    useEffect(() => {
        fetchCourse()
    }, [ ])

    return (
        <div className="course__row">
            { course ? (
                <div className="course">
                    
                </div>
            ) : (
                <NoContent />
            ) }
        </div>
    )
}