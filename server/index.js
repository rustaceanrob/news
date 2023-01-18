const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
require('dotenv').config();
const http = require('http');
const {Server} = require('socket.io');
const axios = require('axios');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../build')));

const server = http.createServer(app);
const io = new Server(server);

app.post('/api/news', async function(req, res) {
    let config = {
        method: 'GET',
        url: 'https://newsapi.org/v2/everything',
        params: { apiKey: process.env.NEWS_API, 
                    q: req.body.category,
                    language: 'en',
                    from: req.body.yesterday,
                    to: req.body.today,
                    pageSize: 10, 
                    page: req.body.pageNumber}
    }

    // axios(config).then((response) => {
    //     res.json(res)
    // }).catch(error) 
    try {
        let response = await axios(config)
        console.log(response)
        res.json(response.data)
    } catch(error) {
        res.json(error)
    }
})


app.post("/api/invoiceUSer", async function(req, res) {
    console.log(req.body);
	let data = JSON.stringify({
		'correlationId' : Math.random()*1000,
		'description': req.body.description,
		'amount': {
			'currency': req.body.currency,
			'amount': req.body.amount
		}
	})

	let config = {
		method: 'post',
		url: "https://api.strike.me/v1/invoices/handle/konajojo",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': process.env.STRIKE_API_KEY
		},
		data : data
	}

	// make invoice api call and catch errors.
	try {
		let invoiceResponse = await axios(config);
		console.log(invoiceResponse.data);

		// use invoice number to create a quote
		let quoteResponse = await getQuote(invoiceResponse.data.invoiceId)
		console.log(quoteResponse)

		// combine the invoice response and quote response to return to the front end
		let invoiceAndQuote = {
			invoice: invoiceResponse.data,
			quote: quoteResponse
		}

		// return the combined invoiceAndQuote Object to the front end
		res.json(invoiceAndQuote)

	} catch(err) {
		console.log(err.response.config.data)
		res.json(err.response.config.data);
	}
});

const getQuote = async function(invoiceId) {

	let config = {
		method: 'post',
		url: `https://api.strike.me/v1/invoices/${invoiceId}/quote`,
		headers: {
			'Accept': 'application/json',
			'Content-Length': '0',
			'Authorization': process.env.STRIKE_API_KEY
		}
	}

	try{
		let quoteResponse = await axios(config);
		return quoteResponse.data;

	} catch(err) {
		console.log(err.response.config.data)
		return err.response.config.data;
	}
};

app.post("/status", async function(req, res) {
    console.log(req.body)
    res.status(200).end()

    if (req.body.eventType == 'invoice.created') {
        return;
    }

    if (req.body.data.changes[0] == 'state') {
        console.log(`state changed on ${req.body.data.entityId}`);
        let invoiceStatus = await getInvoiceStatus(req.body.data.entityId);
        console.log(`invoiceId: ${req.body.data.entityId} : ${invoiceStatus}`)
        io.emit('message', {invoiceId: req.body.data.entityId, status: invoiceStatus})
    }

})

const getInvoiceStatus = async function(invoiceId) {

	let config = {
		method: 'get',
		url: `https://api.strike.me/v1/invoices/${invoiceId}`,
		headers: {
			'Accept': 'application/json',
			'Authorization': process.env.STRIKE_API_KEY
		}
	}

	try {
		let response = await axios(config);
		console.log(response.data)
		return response.data.state;

	} catch(err) {
		console.log(err.response.config.data)
		return err.response.config.data;
	}
}

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);
  });

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});