import fetch from 'node-fetch';

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    if (!process.env.WEB3FORMS_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'API Key is not set.' }),
        };
    }

    try {
        const formData = JSON.parse(event.body);

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_key: process.env.WEB3FORMS_API_KEY,
                ...formData,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: 'Web3Forms API error', error: data }),
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error in serverless function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
}
