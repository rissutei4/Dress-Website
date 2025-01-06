const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

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

    return {
        statusCode: response.status,
        body: JSON.stringify(data),
    };
};
