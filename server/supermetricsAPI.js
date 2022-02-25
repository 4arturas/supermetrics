const axios = require("axios");

async function connectToSupermetricsAPI( client_id, email, name ) {
    try {
        const response = await axios.post('https://api.supermetrics.com/assignment/register', {
            client_id: client_id,
            email: email,
            name: name
        });
        return { status: response.status, data: response.data.data };
    } catch (error) {
        console.error(error);
        return { status: error.response.status, statusText: error.response.statusText };
    }
}

const getDataFromSupermetricsAPI = async function( sl_token, page ) {
    try {
        const response = await axios.get(`https://api.supermetrics.com/assignment/posts?sl_token=${sl_token}&page=${page}` );
        return { status: response.status, data: response.data.data };
    } catch (error) {
        console.error(error);
        return { status: error.response.status, statusText: error.response.statusText };
    }
}

module.exports = {
    connectToSupermetricsAPI,
    getDataFromSupermetricsAPI
};