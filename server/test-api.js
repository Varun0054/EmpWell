// Simple test script using node's fetch (Node 18+)
// Usage: node test-api.js

const BASE_URL = 'http://localhost:5000/api/posts';

async function runTests() {
    console.log('--- Starting API Tests ---');

    // 1. Create a Post
    console.log('\n[TEST 1] Creating a Post...');
    try {
        const createRes = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                organization: 'Tech Corp',
                channel: 'stress',
                content: 'This is a test post for verifying the API endpoints. It needs to be long enough.'
            })
        });

        if (createRes.status === 201) {
            const data = await createRes.json();
            console.log('✅ Post Created:', data._id);

            // 2. Fetch Posts
            console.log('\n[TEST 2] Fetching Posts...');
            const fetchRes = await fetch(`${BASE_URL}?organization=Tech Corp&channel=stress`);
            const posts = await fetchRes.json();
            console.log(`✅ Fetched ${posts.length} posts`);
            const found = posts.find(p => p._id === data._id);
            if (found) console.log('✅ Newly created post found in list');
            else console.error('❌ Created post NOT found in list');

            // 3. React to Post
            console.log('\n[TEST 3] Reacting to Post...');
            const reactRes = await fetch(`${BASE_URL}/${data._id}/react`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'notAlone' })
            });
            const updatedPost = await reactRes.json();
            console.log(`✅ Reacted. 'notAlone' count: ${updatedPost.reactions.notAlone}`);

        } else {
            console.error('❌ Failed to create post:', await createRes.text());
        }

        // 4. Validation Fail
        console.log('\n[TEST 4] Testing Validation (Short content)...');
        const failRes = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                organization: 'Tech Corp',
                channel: 'stress',
                content: 'Too short'
            })
        });
        if (failRes.status === 400) console.log('✅ Validation worked (400 Bad Request)');
        else console.error('❌ Validation FAILED', failRes.status);

    } catch (err) {
        console.error('❌ Test Script Error:', err);
    }
}

runTests();
