const { default: axios } = require("axios");


const baseURL= 'https://api.apis.net.pe/v1';


const sunatApi = axios.create({baseURL});


sunatApi.interceptors.request.use(
    async(config)=>{
        config.headers.Authorization = 'Bearer apis-token-1862.adqI1WWNSI2zJqfkEHOiru14Ek7zausK';
        config.headers.Accept ='application/json'
        return config;
    }
);

module.exports = sunatApi;