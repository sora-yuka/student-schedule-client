import { Fragment, useCallback, useEffect, useState } from 'react'
import NewsDesktop from './components/News.desktop.jsx'
import NewsDetail from './components/NewsDetail.jsx'

import './News.css'


export default function News() {
    const [isNewsOpened, setIsNewsOpened] = useState(false)
    const [newsId, setNewsId] = useState(null)

    return (
        <div className="news-row">
            { !isNewsOpened ?
                <NewsDesktop
                    setIsNewsOpened={ setIsNewsOpened }
                    setNewsId = { setNewsId }
                /> :
                <NewsDetail
                    newsId={ newsId }
                    setIsNewsOpened={ setIsNewsOpened }
                />
            }
        </div>
    )
}