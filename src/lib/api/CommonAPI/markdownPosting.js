import axios from './default';

export const fetchFileAPI = (formdata) => {
    return axios.post(`/postting/fetchFile`, formdata)
}

export const fetchUrlAPI = (url) => {
    return axios.post(`/postting/fetchUrl`, {
        url
    })
}