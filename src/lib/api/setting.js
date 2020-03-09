
import {historyPopCache, http} from './Common';



// 필요한 요청의 config 객체와 historyPopCache()를 merge하여 뒤로가기 캐시 적용


export const getSettingAPI = {
  get: ({ page, config, history } = {}) => {
    return http.get(`/setting/${page}`)
  }
}

export const setSocialAPI = {
    get: ({ page, config, history } = {}) => {
        return http.get(`/setting/social/Info`);
    }
}