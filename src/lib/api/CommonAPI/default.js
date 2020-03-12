import axios from 'axios';

const baseURL = (() => {
    if(process.env.NODE_ENV ==='development') {
      return 'http://localhost:5000/';
    };
    return 'https://api.sublog.co';
})();

const defaultPath = axios.create({
    baseURL
})

export default defaultPath;