import request from '@/utils/request'
import axios from 'axios'
import Auth from '@/utils/auth'
const state = {
  token: '',
  navList: []
}
const mutations = {
  setNavList: (state, data) => {
    state.navList = data
  },
  setToken: (state, data) => {
    if (data) {
      Auth.setToken(data)
    }
  }
}

const actions = {
  loginout({ commit }) {
    return new Promise((resolve) => {
      commit('setToken', '')
      // commit('user/setName', '', { root: true })
      // commit('tagNav/removeTagNav', '', { root: true })
      resolve()
    })
  },
  // 获取新Token
  getNewToken({ commit, state }) {
    return new Promise((resolve) => {
      axios.get('https://localhost:44306/api/user')
        .then(function(response) {
          console.log(response)
          commit('setToken', response.data.token)
          resolve()
        })
    })
  },

  // 获取该用户的菜单列表
  getNavList({ commit }) {
    return new Promise((resolve) => {
      request({
        url: '/user/navlist',
        methods: 'post',
        data: {}
      }).then((res) => {
        commit('setNavList', res)
        resolve(res)
      })
    })
  },

  // 将菜单列表扁平化形成权限列表
  getPermissionList({ state }) {
    return new Promise((resolve) => {
      const permissionList = []
      // 将菜单数据扁平化为一级
      function flatNavList(arr) {
        for (const v of arr) {
          if (v.child && v.child.length) {
            flatNavList(v.child)
          } else {
            permissionList.push(v)
          }
        }
      }
      flatNavList(state.navList)
      resolve(permissionList)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
