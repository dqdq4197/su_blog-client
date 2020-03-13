import axios from './default';

export const authLoginAPI = ({email,password}) => {
    return axios.post(`/auth/login`, {
        email,
        password,
    })
}
export const removeProfileAPI = ({page,formdata}) => {
    console.log(page);
    return axios.post(`/auth/profile/img/${page}`, {formdata})
}

export const setProfileAPI = ({page,formdata}) => {
    return axios.post(`/auth/profile/img/${page}`,formdata)
}

export const signupAPI = ({email,password,Nickname}) => {
    return axios.post(`/auth/signup`, {
        email,
        password,
        Nickname
    })
}