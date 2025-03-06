async function fetchTransactions() {
    const response = await fetch('http://localhost:5000/get_transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    const transactions = await response.json();
    console.log('Transactions:', transactions);

    let output = '<h3>Recent Transactions</h3>';
    transactions.forEach(txn => {
        output += `<p>${txn.date} - ${txn.name}: $${txn.amount}</p>`;
    });

    document.getElementById('transactions').innerHTML = output;
}

document.getElementById('fetchTransactions').addEventListener('click', fetchTransactions);
