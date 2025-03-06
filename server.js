npm init -y
npm install express dotenv cors body-parser plaid

app.post('/get_transactions', async (req, res) => {
    try {
        const response = await client.transactionsGet({
            access_token: ACCESS_TOKEN,
            start_date: '2024-01-01', // Adjust as needed
            end_date: '2024-03-06',
        });

        res.json(response.data.transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

