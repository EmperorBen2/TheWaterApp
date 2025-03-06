require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const plaid = require('plaid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new plaid.Client({
    clientID: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    env: plaid.environments.sandbox, // Change to 'development' or 'production'
});

let ACCESS_TOKEN = '';

app.post('/get_access_token', async (req, res) => {
    try {
        const { public_token } = req.body;
        const response = await client.exchangePublicToken(public_token);
        ACCESS_TOKEN = response.access_token;
        res.json({ access_token: ACCESS_TOKEN });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
