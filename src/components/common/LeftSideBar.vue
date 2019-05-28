<template>
  <div class="left-side-bar-app">
    <button class="menu-toggle-btn" v-on:click="toggleMenu()">
      <font-awesome-icon icon="bars" v-if="isMenuHide"/>
      <font-awesome-icon icon="times" v-if="!isMenuHide"/>
      <!---->
      <!--<i class="far fa-bars" v-if="isMenuHide"></i>-->
      <!--<i class="far fa-times" v-if="!isMenuHide"></i>-->
    </button>

    <ul id="menu-bar-wrapper" v-bind:class="{hide: isMenuHide, active: !isMenuHide}">
      <li>{{this.$store.state.username}}님 반가워요!</li>
      <li v-on:click="GoTo(4)">마이페이지</li>
      <li v-on:click="Logout">로그아웃</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'LeftSideBar',
  data: function () {
    return {
      isMenuHide: true,
      apiAddr: this.$store.state.apiAddr,
      username: this.$store.state.username
    }
  },
  created () {
    if (this.username == null) {
      this.username = this.$cookie.get('userId')
    }
  },
  methods: {
    GoTo: function (index) {
      alert(index)
    },
    toggleMenu: function () {
      this.isMenuHide = !this.isMenuHide
    },
    Logout: function () {
      this.$store.dispatch('doLogout')
      this.$router.push('/')
      console.log('logout : ' + this.username)
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes fadein {
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
}
@-moz-keyframes fadein { /* Firefox */
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
}
@-webkit-keyframes fadein { /* Safari and Chrome */
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
}
@-o-keyframes fadein { /* Opera */
  from {
    opacity:0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    opacity:1;
  }
  to {
    opacity:0;
    display: none;
  }
}
@-moz-keyframes fadeout { /* Firefox */
  from {
    opacity:1;
  }
  to {
    opacity:0;
    display: none;
  }
}
@-webkit-keyframes fadeout { /* Safari and Chrome */
  from {
    opacity:1;
  }
  to {
    opacity:0;
    display: none;
  }
}
@-o-keyframes fadeout { /* Opera */
  from {
    opacity:1;
  }
  to {
    opacity: 0;
    display: none;
  }
}
.left-side-bar-app {
  .menu-toggle-btn {
    position: fixed;
    left: 0;
    top: 0;
    margin: 9px;
    background-color: #fff;
    font-size: 25px;
    /*padding: 10px 25px;*/
    /*border-radius: 14px;*/
    border: none;
    cursor: pointer;

    &:hover {
      /*background-color: black;*/
      /*color: #fff;*/
    }
  }
  ul {
    border: 1px solid;
    float: left;
    width: 200px;
    background-color: #fff;
    /*height: 400px;*/
    position: fixed;
    top: 50px;
    list-style: none;
    padding: 0px;
    text-align: left;

    transition: all 1.5s;
    &.active {
      animation: fadein 2s;
      -moz-animation: fadein 2s; /* Firefox */
      -webkit-animation: fadein 2s; /* Safari and Chrome */
      -o-animation: fadein 2s; /* Opera */
      transition-timing-function: ease-in-out;
      transform:translate(0,0)
    }
    &.hide {
      animation: fadeout 2s;
      -moz-animation: fadeout 2s; /* Firefox */
      -webkit-animation: fadeout 2s; /* Safari and Chrome */
      -o-animation: fadeout 2s; /* Opera */
      opacity: 0;
      pointer-events: none;
      transition-timing-function: ease-out;
      transform:translate(-300px,0)
    }

    li {
      border: 1px solid gray;
      cursor: pointer;
      padding: 10px 0px;
      &:hover {
        background-color: gray;
        color: white;
      }
    }
  }
  background-color: lightblue;
}
</style>
