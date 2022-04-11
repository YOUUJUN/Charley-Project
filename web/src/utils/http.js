import axios from 'axios';
import config from "./config";

let service = axios.create({
    baseURL : config.baseUrl(),
    withCredentials :true
});

service.interceptors.request.use(function (config) {
    let marscript = window.localStorage.getItem("marscript");
    if (marscript) {
        config.headers.accessToken = marscript;
        // config.headers['accessToken'] = Token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});




export default service;