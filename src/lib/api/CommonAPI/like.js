import axios from './default';

export const getLikeAPI = ({id,user}) => {
    return axios.post(`/post/getLike`, {
        postId:id,
        user_nick:user
    })
}

export const setLikeAPI = ({id,user}) => {
    return axios.post(`/post/setLike`, {
        postId:id,
        user_nick:user
    })
}