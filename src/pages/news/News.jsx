import { useState, useCallback, useEffect, Fragment } from 'react'
import Button from '../../components/button/Button'

import './News.css'


export default function News() {
    const [ news, setNews ] = useState(null)
    const [ isNewsOpened, setIsNewsOpened ] = useState(false)
    const [ newsDetail, setNewsDetail ] = useState(null)

    const fetchNews = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/news/", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("access_token"),
                },
            })
    
            if (response.status === 200) {
                const data = await response.json()
                setNews(data)
            }
        } catch (error) {
            console.log("An error occured while getting news")
        }
    }, [ ])

    useEffect(() => {
        fetchNews()
    }, [ fetchNews ])

    return (
        <div className="news-row">
            { !isNewsOpened ? (
                <Fragment>
                    { news && (
                        <Fragment>
                            { news.map((singleNews) => (
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
                                            setIsNewsOpened(!isNewsOpened)
                                            setNewsDetail(singleNews) 
                                        } }
                                    >
                                        Читать дальше
                                    </Button>
                                </div>
                            )) }
                        </Fragment>
                    ) }
                </Fragment>
                ) : (
                <div className="news-detail">
                    { newsDetail && (
                        <Fragment> 
                            <div className="news-detail__heading">
                                <Button
                                    className="btn__go-back"
                                    onClick={ () => { 
                                        setIsNewsOpened(!isNewsOpened) 
                                        setNewsDetail(null)
                                    } }
                                >
                                    ⟵
                                </Button>
                                <h3 className="news-detail__headline">{ newsDetail.header }</h3>
                            </div>
                            <div className="news-detail__timestamp">
                                    <div className="created-at">
                                        <p className="create-at__value">Опубликовано: { newsDetail.created_at }</p>
                                    </div>
                                    <div className="updated-at">
                                        <p className="updated-at__value">Обновлено: { newsDetail.updated_at }</p>
                                    </div>
                            </div>
                            <div className="news-detail__content">
                                <div className="news-detail__preview">
                                    <img src={ newsDetail.preview } alt=""/>
                                </div>

                                <p className="news-detail__text">{ newsDetail.content }</p>

                                <div className="news-detail__links">
                                    { newsDetail.links.map((source) => (
                                        <div className="link" key={ source.id }>
                                            <p className="link__value">
                                                Источник: <a href={ source.link } target='_blank'>{ source.link }</a>
                                            </p>
                                        </div>
                                    )) }
                                </div>
                            </div>
                        </Fragment>
                    ) }
                </div>
                )
            }
        </div>
    )
}