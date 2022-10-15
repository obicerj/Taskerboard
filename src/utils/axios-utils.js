import axios from "axios";

const client = axios.create({ baseURL: 'http://localhost:4500'})

export const request = async ({...options}) => {
    const onSuccess = (response) => response;
    const onError = (error) => {
        return error
    }
    try {
        const response = await client(options);
        return onSuccess(response);
    } catch (error) {
        return onError(error);
    }
}