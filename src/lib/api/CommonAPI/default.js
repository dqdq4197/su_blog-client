import axios from 'axios';

const baseURL = (() => {
    if(process.env.NODE_ENV ==='development') {
      return 'http://localhost:5000/';
    };
    return 'http://15.164.229.89';
})();

const defaultPath = axios.create({
    baseURL
})

export default defaultPath;