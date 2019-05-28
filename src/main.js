/* eslint-disable no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCarousel from 'vue-carousel'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
// import 'custom.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faBars, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex)
Vue.use(VueCarousel)
Vue.use(VueCookie)
Vue.use(BootstrapVue)
Vue.use(format, formatDistance, formatRelative, subDays)
// Vue.use(axios)

const domainCheck = window.location.host
const apiAddr = domainCheck.indexOf('localhost') !== -1 ? 'http://localhost:8080' : 'http://rest.bangshinchul.com:9000'

axios.defaults.baseURL = domainCheck.indexOf('localhost') !== -1 ? 'http://localhost:8080' : 'http://rest.bangshinchul.com:9000'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
Vue.config.productionTip = true

const store = new Vuex.Store({
  state: { // 변수
    accessToken: null, // jwt token
    loginMessage: '',
    username: '',
    apiAddr: apiAddr
  },
  getters: {
    doLoginCheck: (state) => {
      // alert(`LOGIN_CHECK -> ${state.accessToken}`)
      if (state.accessToken) {
        // alert(`LOGIN_CHECK TRUE`)
        return true
      } else {
        // alert(`LOGIN_CHECK FALSE`)
        return false
      }
    }
  },
  mutations: { // 메서드
    LOGIN (state, {accessToken, username}) {
      console.log(`mutations LOGIN ${accessToken} / ${username}`)
      // alert(`LOGIN -> ${accessToken} / ${username}`)
      state.accessToken = accessToken
      state.username = username
      axios.defaults.headers.common['Authorization'] = accessToken
    },
    LOGOUT (state) {
      state.accessToken = null
      state.username = null
    }
  },
  actions: {
    doLogout (context) {
      context.commit('LOGOUT')
    },
    setLoginInfo (context, {accessToken, username}) {
      // alert(`set login info -> ${accessToken} / ${username}`)
      context.commit('LOGIN', {accessToken, username})
    }
  }
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
