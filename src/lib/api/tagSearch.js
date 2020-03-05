
import {historyPopCache, http} from './Common';



// 필요한 요청의 config 객체와 historyPopCache()를 merge하여 뒤로가기 캐시 적용


export const tagSearchAPI = {
    get: ({ page, config, history } = {}) => {
      console.log(history.action);
      return http.get(`/tag/getTags`, historyPopCache(config, history))
    }
}

export const tagFeedAPI = {
    get: ({ page, config, history } = {}) => {
        console.log(history.action);
        return http.get(`/tag/getPost/${page}`, historyPopCache(config, history))
      }
}