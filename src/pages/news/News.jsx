import { Fragment, useCallback, useEffect, useState } from 'react'
import NewsDesktop from './components/News.desktop.jsx'
import NewsMobile from './components/News.mobile.jsx'
import NewsDetail from './components/NewsDetail.jsx'
import NoContent from '../../components/no-content/NoContent.jsx'

import './News.css'


export default function News() {
    const [isNewsOpened, setIsNewsOpened] = useState(false)
    const [news, setNews] = useState(null)
    const [newsId, setNewsId] = useState(null)

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
                    { !isNewsOpened ? (
                        <Fragment>
                        <NewsDesktop
                            news={ news }
                            setNewsId={ setNewsId }
                            setIsNewsOpened={ setIsNewsOpened }
                        />
                        <NewsMobile
                            news={ news }
                            setNewsId={ setNewsId }
                            setIsNewsOpened={ setIsNewsOpened }
                        />
                    </Fragment>
                    ) : (
                        <NewsDetail 
                            newsId={ newsId }
                            setIsNewsOpened={ setIsNewsOpened }
                        />
                    ) }
                </div>
            ) : (
                <NoContent />
            ) }
        </Fragment>
    )
}