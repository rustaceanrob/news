import './App.css';
import Header from './Components/Header';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import useNewsSearch from './Hooks/useNewsSearch';
import Article from './Components/Article';
import Footer from './Components/Footer';
import QRCard from './Components/QRCard';
import axios from 'axios';

function App() {
  const [category, setCategory] = useState('bitcoin')
  const [pageNumber, setPageNumber] = useState(1)
  const [totalSearches, setTotalSearches] = useState(0)
  const [mustPayInvoice, setMustPayInvoice] = useState(false)
  const [invoiceReady, setInvoiceReady] = useState(false)
  const [invoiceError, setInvoiceError] = useState(false)
  const [invoiceObj, setInvoiceObj] = useState(false)
  const [quoteObj, setQuoteObj] = useState()
  const socket = io();

  socket.on('message', (res) => {
    handleMessage(res)
  })

  function handleMessage(res) {
    if (res.invoiceId === invoiceObj.invoiceId && res.status == 'PAID') {
      setTotalSearches(0)
      setMustPayInvoice(false)
    }
  }

  async function invoiceUser(e) { 
    console.log('time to invoice the user');
    setMustPayInvoice(true);
    let data = JSON.stringify({
        "description": "More news searches",
        "amount": "0.05",
        "currency": "USD"
    })

    let config = {
      method: 'post',
      url: '/api/invoiceUser',
      headers: {
        'Content-Type': 'application/json',
				'Accept': 'application/json'
      },
      data: data
    }

    axios(config).then((response) => {
      console.log(JSON.stringify(response.data))
      setInvoiceObj(response.data.invoice)
      setQuoteObj(response.data.quote)
      setInvoiceReady(true)
    }).catch((error) => {
      console.warn(error)
      setInvoiceError(true)
    })
  }

  function handleSearch(e) {
    e.preventDefault()
    setCategory(e.target.textBox.value)
    setPageNumber(1)
    setTotalSearches(totalSearches + 1)
    window.scrollTo(0,0)
    if (totalSearches > 3) {
      invoiceUser()
    }
  }

  function togglePage(e) {
    if (e.target.id === "next") {
      if (pageNumber < pages) {
        setPageNumber(pageNumber+1)
      } 
      window.scrollTo(0,0)
      return
    } else {
      if (pageNumber > 1) {
        setPageNumber(pageNumber-1)
      }
      window.scrollTo(0,0)
    }
  }

  const {loading, error, articles, pages} = useNewsSearch(category, pageNumber)

  return (  
    <div>
      <Header category={category} handleSearch={handleSearch}/>
      <div className='container mx-auto max-w-screen-md'>
        { mustPayInvoice ? (
          invoiceError ? (
            <div className='flex flex-col flex-grow pt-10 justify-center items-center'>
              <h1 className='text-white font-mono text-orange-400'>There was an error attempting to invoice you</h1>
              <p className='text-white font-mono text-sm pt-5'>Please try again later!</p>
            </div>
          ) : (
            !(invoiceReady) ? (
              <div className='flex flex-col flex-grow pt-10 justify-center items-center'>
                <p className='text-white font-mono text-sm pt-5'>Waiting for your invoice...</p>
              </div>
            ) : (
              <QRCard invoice={invoiceObj} quote={quoteObj} lnInvoice={quoteObj.lnInvoice}/>
            )
          )
        ) : (
          <>
            {
                articles.length === 0 ? (
                  error ? (
                    <div className='flex flex-col flex-grow pt-10 justify-center items-center'>
                      <h1 className='text-white font-mono text-orange-400'>Hang tight...</h1>
                      <p className='text-white font-mono text-sm pt-5'>If the news does not load after a few seconds, an error occured</p>
                    </div>
                  ) : (
                    <div className='flex flex-col flex-grow pt-10 justify-center items-center'>
                      <h1 className='text-white font-mono'>No articles</h1>
                      <p className='text-white font-mono text-sm pt-5'>Start by searching a keyword!</p>
                    </div> 
                  )
                    
                ) : (
                  <>
                    {articles.map(article => {
                      return <Article publisher={article.source["name"]} title={article.title} description={article.description} publishedAt={article.publishedAt} link={article.url}/>
                    })}
                    <Footer page={pageNumber} togglePage={togglePage} numberOfPages={pages}/>
                  </>
                )
              }
          </>
        )}
      </div>   
    </div>
  )
}

export default App;
