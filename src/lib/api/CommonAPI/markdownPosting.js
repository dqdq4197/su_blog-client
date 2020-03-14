import axios from './default';

export const fetchFileAPI = (formdata) => {
    return axios.post(`/posting/fetchFile`, formdata)
}

export const fetchUrlAPI = (url) => {
    return axios.post(`/posting/fetchUrl`, {
        url
    })
}