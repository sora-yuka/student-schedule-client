import { Fragment, useCallback, useEffect, useState } from 'react'
import NewsDesktop from './components/News.desktop.jsx'
import NewsMobile from './components/News.mobile.jsx'
import NewsDetail from './components/NewsDetail.jsx'

import './News.css'


export default function News() {
    const [isNewsOpened, setIsNewsOpened] = useState(false)
    const [newsId, setNewsId] = useState(null)

    return (
        <div className="news-row">
            { !isNewsOpened ?
                <Fragment>
                    <NewsDesktop
                        setIsNewsOpened={ setIsNewsOpened }
                        setNewsId = { setNewsId }
                    />
                    <NewsMobile
                        setIsNewsOpened={ setIsNewsOpened }
                        setNewsId = { setNewsId }
                    />
                </Fragment>
                :
                <NewsDetail
                    newsId={ newsId }
                    setIsNewsOpened={ setIsNewsOpened }
                />
            }
        </div>
    )
}