import axios from './default';

export const putParrentReplyAPI = (page,{parentValue,postId}) => {
    return axios.put(`/comment/parentReply/${page}`, {
        parentValue,
        postId,
    })
}

export const putChildReplyAPI = (page,{replyId,childValue,postId}) => {
    return axios.put(`/comment/childReply/${page}`, {
        replyId,
        childValue,
        postId
    })
}

export const deleteReplyAPI = (id) => {
    return axios.delete(`/comment/delete/${id}`)
}