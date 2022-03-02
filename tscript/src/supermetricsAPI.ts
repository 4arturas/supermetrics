import axios from "axios";


export async function connectToSupermetricsAPI( client_id: string, email: string, name: string ) {
    try {
        const response = await axios.post('https://api.supermetrics.com/assignment/register', {
            client_id: client_id,
            email: email,
            name: name
        });
        return { status: response.status, statusText: null, data: response.data.data };
    } catch (error : any) {
        console.error(error);
        return { status: error.response.status, statusText: error.response.statusText, data: null };
    }
}

export async function getDataFromSupermetricsAPI( sl_token: string, page: number ) {
    try {
        const response = await axios.get(`https://api.supermetrics.com/assignment/posts?sl_token=${sl_token}&page=${page}` );
        return { status: response.status, data: response.data.data };
    } catch (error: any) {
        console.error(error);
        return { status: error.response.status, statusText: error.response.statusText };
    }
}