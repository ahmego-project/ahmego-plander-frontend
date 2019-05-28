<template>
    <div class='before-signup-wrapper'>
        <p class='title'>가입 유형을 선택해주세요</p>
        <b-button>디자이너 회원가입</b-button>
        <b-button>일반유저 회원가입</b-button>
    </div>
</template>
<script>
/* eslint-disable */ 
export default {
    name: 'BeforeSignUp',
    data () {
        return {}
    },
    created () {
    },
    mounted () {
    },
    methods: {
    }
}
</script>
<style lang="scss">
.before-signup-wrapper {
    padding: 30px;
}

.title {
    font-size: 27px;
}

[type=button] {
  margin-top: 50px;
  padding: 10px 40px;
//   padding: 15px 10px;
  border: none;
  border: 1px solid #ddd;
  background-color: #ddd;
  color: black;
}

[type=button]:hover {
  background-color: black;
  color: #fff;
}
</style>


