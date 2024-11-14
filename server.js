const express = require('express');
const app = express();
const port = 8080;
const fetch = require('node-fetch');
const cheerio = require('cheerio');

//variables
const baseUrl = (stock) => `https://finance.yahoo.com/quote/${stock}/history/?p=${stock}`

app.use(express.json());
app.use(require('cors')());

//routes
app.get('/', (req, res) => {
    res.status(200).send({message: 'thank you for trying our API'});
})

app.get('/api/stock', async (req, res) =>{
    const { stock } = req.query
    console.log('STOCK TICKER: ' + stock)
    if (!stock) {
        return res.sendStatus(403)
    }

    try {
        const stockDataUrl = baseUrl(stock)
        const stockRes = await fetch(stockDataUrl)
        const data = await stockRes.text()
        console.log(data)
        const prices = data
        console.log(prices)
        res.status(200).send({ prices })
    } catch (err) {
        console.log('THERE WAS AN ERROR', err)
        res.sendStatus(500)
    }
})

app.post('/test', (req, res) => {
    const body = req.body;
    const {message} = body;
    console.log('THIS IS THE MESSAGE:' + message);
    res.sendStatus(200);
})

app.listen(
    port,
    () => console.log(`its alive on http://localhost:${port}`)
)
