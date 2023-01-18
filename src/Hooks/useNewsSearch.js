import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

export default function useNewsSearch(category, pageNumber) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [articles, setArticles] = useState([])
    const [pages, setPages] = useState(1)
    const today = moment().format('YYYY-MM-DD')
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')

    useEffect(() => {
        setLoading(true)
        setError(false)
        let data = {
            "category": category,
            "yesterday": yesterday,
            "today": today,
            "pageNumber": pageNumber 
        }

        let config = {
            method: 'post',
            url: '/api/news',
            data: data
        }

        axios(config).then((res) => {
            const responseCode = res.data['status']
            console.log(res.data)
            if (responseCode === "ok" ) {
                console.log(res.data)
                setArticles(res.data.articles)
                setPages((res.data['totalResults'] % 10) + 1) 
                console.log(res.data.articles)
            } else {
                setError(true)
                setArticles([])
            }
        }).catch((error) => {
            console.log(error)
            console.log('an error occured')
            setError(true)
        })

    }, [category, pageNumber])


    return { loading, error, articles, pages }
}
