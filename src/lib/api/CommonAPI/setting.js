import axios from './default';

export const saveSkillAPI = (nick,{skill}) => {
    console.log(skill)
    return axios.patch(`/setting/${nick}`,{
      skill  
    })
}

export const setIntroAPI = (id,{value}) => {
    return axios.patch(`/setting/intro/${id}`, {
        data:value
    })
}

export const saveSocialAPI = ({name,data},id) => {
    return axios.post(`setting/social/${name}`, {
        data,
        id
    })
}
