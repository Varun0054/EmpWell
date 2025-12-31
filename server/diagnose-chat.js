

async function testChat() {
    console.log('Testing Chat Endpoint...');
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Hello' }]
            })
        });

        console.log(`Status: ${response.status}`);
        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('Fetch Error:', error.message);
    }
}

testChat();
