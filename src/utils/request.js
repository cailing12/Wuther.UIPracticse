import axios from 'axios'
import store from '../store'
import router from '../router'
import { Message } from 'element-ui'
import Auth from '@/utils/auth'

var getTokenLock = false
var CancelToken = axios.CancelToken
var requestList = []

function checkToken(cancel, callback) {
  if (!Auth.hasToken()) {
    if (Auth.tokenTimeoutMethod === 'getNewToken') {
      if (!getTokenLock) {
        getTokenLock = true
        store.dispatch('auth/getNewToken').then((res) => {
          console.log('已获取新token')
          if (!Auth.hasToken()) {
            checkToken(cancel, callback)
          }
          getTokenLock = false
          callback()
        })
      }
    }
    if (Auth.tokenTimeoutMethod === 'jumpAuthPage' && Auth.isLogin()) {
      if (router.currentRoute.path !== '/auth') {
        cancel()
        router.push('/auth')
      }
    }
  } else {
    callback()
  }
}

function stopRepeatRquest(url, c) {
  for (let i = 0; i < requestList.length; i++) {
    if (requestList[i] === url) {
      c()
      return
    }
  }
  requestList.push(url)
}

const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    let cancel
    config.cancelToken = new CancelToken(function executor(c) {
      cancel = c
    })
    checkToken(cancel, function() {
      Auth.setLoginStatus()
      config.headers.Authorization = '${store.state.user.token}'
    })
    stopRepeatRquest(config.url, cancel)
    return config
  }
)

service.interceptors.response.use(
  response => {
    for (let i = 0; i < requestList.length; i++) {
      if (requestList[i] === response.config.url) {
        // 注意，不能保证500ms必定执行，详情请了解JS的异步机制
        setTimeout(function() {
          requestList.splice(i, 1)
        }, 500)
        break
      }
    }
    return Promise.resolve(response.data)
  },
  error => {
    if (axios.isCancel(error)) {
      console.log(error)
      return Promise.reject('Ajax Abort: 该请求在axios拦截器中被中断')
    } else if (error.response) {
      switch (error.response.status) {
        case 401:
          router.push('error/401')
          break
        case 403:
          router.push('error/403')
          break
        default:
          Message({
            message: `服务器错误！错误代码：${error.response.status}`,
            type: 'error'
          })
      }
      return Promise.reject(error.response.data)
    }
  }
)

export default service
