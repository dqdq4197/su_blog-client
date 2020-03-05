import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import { createBrowserHistory } from 'history'; // BrowserHistory
/// 생략

const baseURL = (() => {
    if(process.env.NODE_ENV ==='development') {
      return 'http://localhost:5000';
    };
    return 'https://api.su_blog.io';
})
export const http = axios.create({
  baseURL:baseURL(),
  // cacheAdapterEnhancer 적용. 기본 캐시동작은 해제
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false })
})

export const historyPopCache = (config, history) => ({
  forceUpdate: history.action === 'PUSH',
  ...config,
  cache: true,
 
  // 뒤로가기, 앞으로가기 : forceUpdate: false
  // 링크 클릭 이동 : forceUpdate: true
})

 
 
