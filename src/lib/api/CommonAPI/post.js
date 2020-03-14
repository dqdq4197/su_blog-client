import axios from './default';

export const deletePostAPI = ({posterId,author}) => {
    return axios.delete(`/post/delete/${posterId}/${author}`)
}

export const postTumnailSaveAPI = (formdata) => {
    return axios.post('/posting/tumnail/', formdata)
}

export const postModifyAPI = ({
    posterId,
    userId,
    nick,
    posterOutputData,
    tumnailPosterInfo,
    scope
}) => {
    return axios.post(`/post/modify/${posterId}`, {
        outputData:posterOutputData,
        userId,       
        nick,
        tumnailTitle:tumnailPosterInfo.title,
        hashTags: tumnailPosterInfo.tags ? tumnailPosterInfo.tags.join(',') : null,
        tumnailImg: tumnailPosterInfo.imgUrl,
        skills:tumnailPosterInfo.skills,
        isHide:scope
    })
}

export const uploadPostAPI = ({
    userId,
    nick,
    posterOutputData,
    tumnailPosterInfo,
    scope
}) => {
    return axios.post('/post/upload',
          {
            outputData:posterOutputData,
            userId,       
            nick,
            tumnailTitle:tumnailPosterInfo.title,
            hashTags: tumnailPosterInfo.tags ? tumnailPosterInfo.tags.join(',') : null,
            tumnailImg: tumnailPosterInfo.imgUrl,
            skills:tumnailPosterInfo.skills,
            isHide:scope,
          })
}