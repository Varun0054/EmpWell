


async function testLocalChat() {
    console.log('Testing Local Chat API...');
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'hello' }]
            })
        });

        console.log(`Status: ${response.status}`);
        const text = await response.text();
        console.log(`Response: ${text}`);

    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

testLocalChat();
