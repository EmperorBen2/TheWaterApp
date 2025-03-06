async function openPlaid() {
    const response = await fetch('http://localhost:5000/create_link_token');
    const data = await response.json();

    const handler = Plaid.create({
        token: data.link_token,
        onSuccess: async (public_token) => {
            await fetch('http://localhost:5000/get_access_token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ public_token }),
            });
            alert('Plaid linked successfully!');
        },
    });

    handler.open();
}

document.getElementById('connectPlaid').addEventListener('click', openPlaid);
