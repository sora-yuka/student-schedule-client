import {Fragment, useCallback, useEffect, useState} from 'react'


// eslint-disable-next-line react/prop-types
export default function NewsMobile({ setIsNewsOpened, setNewsId }) {
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
                    <div
                        className="news-card__mobile"
                        key={ singleNews.id }
                        onClick={() => {
                            setIsNewsOpened(true)
                            setNewsId(singleNews.id)
                        }}
                    >
                        <div className="news-card__preview">
                            <img src={ singleNews.preview } alt="card preview"/>
                        </div>
                        <div className="news-card__header">
                            <h3 className="header">{ singleNews.header }</h3>
                        </div>
                    </div>
                ))
            ) }
        </Fragment>
    )
}