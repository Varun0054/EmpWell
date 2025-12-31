
async function testKey() {
    console.log('Testing Old API Key...');
    const apiKey = "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";

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "allenai/olmo-3.1-32b-think:free",
                messages: [{ role: 'user', content: 'hi' }]
            })
        });

        console.log(`Status: ${response.status}`);
        if (!response.ok) {
            console.log('Response:', await response.text());
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
    }
}

testKey();
