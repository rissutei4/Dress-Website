exports.handler = async function () {
    return {
        statusCode: 200,
        body: JSON.stringify({ apiKey: process.env.WEB3FORMS_API_KEY }),
    };
};
