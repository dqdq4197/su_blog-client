
import {historyPopCache, http} from './Common';



// 필요한 요청의 config 객체와 historyPopCache()를 merge하여 뒤로가기 캐시 적용


export const homeAPI = {
  get: ({ page, config, history } = {}) => {
    console.log(history.action);
    return http.get(`/home/${page}`, historyPopCache(config, history))
  }
}