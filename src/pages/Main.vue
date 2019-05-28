<template>
  <div class="app">
    <!-- <hello-carousel></hello-carousel> -->
    <h1>미용인들의 친구,<br>아미고!</h1>
    <login></login>
  </div>
</template>

<script>
/* eslint-disable vue/no-shared-component-data */

import Login from '../components/auth/Login'
import HelloCarousel from '../components/slider/HelloCarousel'

export default {
  name: 'Main',
  components: {Login, HelloCarousel},
  comments: {
    Login
  },
  data: function () {
    return {
      isLogin: false,
      drawer: true
    }
  },
  created () {
    this.$on('LoginSuccess', function () {
      // window.location.href = '/home'
      this.$router.push('/home')
    })
  },
  mounted () {
    console.log('api address : ' + this.$store.state.apiAddr)
    // 현재 로그인상태인지 체크
    const loginCheck = this.$store.getters.doLoginCheck
    if (loginCheck) {
      if (loginCheck) {
        alert(`환영합니다! ${this.$store.state.username}님!`)
        // window.location.href = '/home'
        this.$router.push('/home')
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
