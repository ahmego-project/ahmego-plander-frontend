<template>
    <div class="app">
      <left-side-bar></left-side-bar>
      <div class="home-content-section">
        <calendar v-model="curr"/>
      </div>
    </div>
</template>

<script>
import CoinRotate from '../components/test/CoinRotate'
import LeftSideBar from '../components/common/LeftSideBar'
import Calendar from '../components/common/Calendar'
export default {
  name: 'Home',
  data () {
    return {
      username: '',
      curr: new Date()
    }
  },
  components: {
    LeftSideBar,
    CoinRotate,
    Calendar
  },
  created () {
    // 현재 로그인상태인지 체크
  },
  mounted () {
    console.log('api address : ' + this.$store.state.apiAddr)
    const loginCheck = this.$store.getters.doLoginCheck
    // const authToken = this.$store.state.accessToken
    // alert(`HOME Login check : ${loginCheck} / ${authToken}`)
    if (loginCheck) {
      this.username = this.$store.state.username
      alert(`환영합니다! ${this.username}님!`)
    } else {
      alert('로그인을 해주세요.')
      // window.location.href = '/'
      this.$router.push('/')
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
body {
  margin: 0px;
}
.home-content-section {

}
</style>
