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
        axios({
            method: 'GET',
            url: 'https://newsapi.org/v2/everything',
            params: { apiKey: 'f6247aca446549ad9f4ea354116474d7', // i would hide this but it doesn't matter
                      q: category,
                      language: 'en',
                      from: yesterday,
                      to: today,
                      pageSize: 10, 
                      page: pageNumber}
        }).then( res => {
            // console.log(res.data['status'])
            const responseCode = res.data['status']
            if (responseCode === "ok" ) {
                setArticles(res.data['articles'])
                setPages((res.data['totalResults'] % 10) + 1) //number of results modulo 10 + 1
                // console.log(res.data['articles'])
            } else {
                setError(true)
                setArticles([])
            }
        }).catch(
            setError(true)
        )

    }, [category, pageNumber])


    return { loading, error, articles, pages }
}
