import {Fragment, useCallback, useEffect, useState} from 'react'
import Button from '../../../components/button/Button'


// eslint-disable-next-line react/prop-types
export default function NewsDesktop({ setIsNewsOpened, setNewsId }) {
    const [news, setNews] =  useState(null)

    const fetchNews = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/news/", {
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
            { news && (
                news.map((singleNews) => (
                    <div className="news-card" key={ singleNews.id }>
                        <h3 className="news-card__headline">
                            { singleNews.header }
                        </h3>
                        <p className="news-card__content">
                            { singleNews.content.slice(0, 100) + " ..." }
                        </p>
                        <Button
                            className="btn__read-news"
                            onClick={ () => {
                                setIsNewsOpened(true)
                                setNewsId(singleNews.id)
                            } }
                        >
                            Читать дальше
                        </Button>
                    </div>
                ))
            ) }
        </Fragment>
    )
}