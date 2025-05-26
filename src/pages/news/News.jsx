import { Fragment, useCallback, useEffect, useState } from 'react'
import NewsDesktop from './components/News.desktop.jsx'
import NewsMobile from './components/News.mobile.jsx'
import NoContent from '../../components/no-content/NoContent.jsx'

import './News.css'


export default function News() {
    const [news, setNews] = useState(null)

    const fetchNews = useCallback(async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_ENDPOINT + "news/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                },
            })

            if (response.status === 200) {
                const data = await response.json()
                setNews(data)
            }
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        fetchNews()
    }, [ ])

    return (
        <Fragment>
            { news ? (
                <div className="news-row">
                    <Fragment>
                        <NewsDesktop
                            news={ news }
                        />
                        <NewsMobile
                            news={ news }
                        />
                    </Fragment>
                </div>
            ) : (
                <NoContent />
            ) }
        </Fragment>
    )
}