const express = require('express');
const Web3WisdomWand = require('web3wisdomwand');
const path = require('path');
const app = express();
const port = 3002;

app.use(express.static('public'));

const wand = new Web3WisdomWand('YOUR_API_KEY');

app.get('/api/sentiment', async (req, res) => {
    const sentiment = await wand.getMarketSentiment();
    res.json(sentiment);
});

app.get('/api/token-metrics/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const metrics = await wand.analyzeToken(symbol);
    res.json(metrics);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, () => console.log(`MirrorMarketMoods running on port ${port}`));
