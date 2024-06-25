import axios from "axios";

const baseURL = process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_BASE_URL_DEV
    : process.env.REACT_APP_API_BASE_URL_PROD;
console.log(process.env.REACT_APP_API_BASE_URL_DEV)
const instance = axios.create({
    baseURL: baseURL,
    timeout: 2000,
    headers: { "Content-Type": "application/json" }
});

export default instance