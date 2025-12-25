import app from './index.js';
import http from 'http';
import mongoose from 'mongoose';

const PORT = 5002;

const startServer = async () => {
    const server = http.createServer(app);

    server.listen(PORT, async () => {
        console.log(`Test server running on port ${PORT}`);

        // Wait for DB connection (rough check)
        await new Promise(r => setTimeout(r, 2000));

        const postData = JSON.stringify({
            organization: 'Tech Corp',
            channel: 'stress',
            content: 'This is a test post from the debug script to verify POST functionality.'
        });

        const options = {
            hostname: 'localhost',
            port: PORT,
            path: '/api/posts',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
                server.close();
                if (mongoose.connection.readyState !== 0) {
                    mongoose.connection.close();
                }
                process.exit(0);
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
            server.close();
            process.exit(1);
        });

        // Write data to request body
        req.write(postData);
        req.end();
    });
};

startServer();
