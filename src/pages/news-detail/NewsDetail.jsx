import { Fragment, useCallback, useEffect, useState } from "react"
import { useParams, NavLink } from "react-router-dom"
import Button from "../../components/button/Button.jsx"

import './NewsDetail.css'


// eslint-disable-next-line react/prop-types
export default function NewsDetail() {
    const [newsDetail, setNewsDetail] = useState(null)
    const params = useParams()

    const fetchNewsDetail = useCallback(async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_ENDPOINT + `news/${params.newsId}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("access_token")
                },
            })

            if (response.status === 200) {
                const data = await response.json()
                setNewsDetail(data)
            }
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        fetchNewsDetail()
    }, [ ])

    return (
        <div className="news-detail">
            { newsDetail && (
                <div className="container">
                    <div className="news-detail__row">
                        <div className="news-detail__heading">
                            <NavLink
                                to="/news"
                                className="btn__go-back"
                            >
                                <span className="arrow">⟵</span>
                                <span className="arrow--mobile"><img src="/icons/back.png" alt=""/></span>
                            </NavLink>
                            <div className="heading__text-block">
                                <h3 className="news-detail__header">{ newsDetail.header }</h3>
                                <div className="news-detail__timestamp">
                                    <div className="created-at">
                                        <p className="create-at__value">Опубликовано: { newsDetail.created_at }</p>
                                    </div>
                                    <div className="updated-at">
                                        <p className="updated-at__value">Обновлено: { newsDetail.updated_at }</p>
                                    </div>
                                </div>
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
                    </div>
                </div>
            ) }
        </div>
    )
}