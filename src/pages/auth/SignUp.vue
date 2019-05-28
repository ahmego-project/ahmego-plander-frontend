<template>
  <div class="signup-form">
    <p
      class="validation-msg"
      v-if="validation_code !== null"
      v-text="validation_msg[validation_code]"
    ></p>
    <transition name="fade" mode="out-in" :duration="{ enter: 1500, leave: 1500 }">
      <!-- BEFORE SIGNUP SECTION -->
      <div class="before-signup-section" v-if="signUpType === null">
        <p class="title">가입 유형을 선택해주세요</p>
        <b-button v-on:click="checkSignUpType(0)">디자이너 회원가입</b-button>
        <b-button v-on:click="checkSignUpType(1)">일반유저 회원가입</b-button>
      </div>

      <!-- REGISTER FORM SECTION -->
      <div class="register-form-section" v-if="signUpType !== null">
        <b-form @submit="onSubmit">
          <!-- ID -->
          <b-input v-model="id" :state="idValidation" id="ID" placeholder="아이디" minlength="5" maxlength="12" required></b-input>
          <b-form-invalid-feedback :state="idValidation">
            아이디는 5-12자 여야합니다.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="idValidation">
            좋습니다!
          </b-form-valid-feedback>

          <!-- PASSWORD -->
          <b-input
            type="password"
            id="password"
            v-model="password"
            aria-describedby="password-help-block"
            placeholder="비밀번호"
            minlength="8" maxlength="20"
            required></b-input>
          <b-form-text id="password-help-block">
            비밀번호는 8-20자 이내이어야하며, 문자와 숫자를 포함해야하며 공백, 특수 문자가 포함되어서는 안됩니다.
          </b-form-text>

          <!-- EMAIL -->
          <b-input type="email" id="email" v-model="email" placeholder="이메일" maxlength="50" required></b-input>
          <!-- NAME -->
          <b-input type="text" id="name" v-model="name" placeholder="이름" minlength="1" maxlength="50" required></b-input>
          <!-- GENDER -->
          <b-form-radio-group
            id="gender"
            v-model="gender"
            :options="gender_options"
            buttons
            button-variant="outline-primary"
            size="lg"
            name="gender"
          ></b-form-radio-group><br>
          <!-- 디자이너 가입 시 노출 -->
          <b-form-group v-if="signUpType !== null && signUpType === 0" id="designer-additional-info">
            <b-input type="text" id="d_position" placeholder="직급" minlength="1" maxlength="50" required></b-input>
            <b-input type="text" id="d_store_name" placeholder="현재 속해있는 매장명" minlength="1" maxlength="50" required></b-input>
            <b-input type="text" id="d_store_address" placeholder="현재 속해있는 매장위치" minlength="1" maxlength="50" required></b-input>
            <b-input type="text" id="d_closed_day" placeholder="휴무일" minlength="1" maxlength="50" required></b-input>
            <b-input type="text" id="d_link" placeholder="예약할 수 있는 링크" minlength="1" maxlength="50" required></b-input>
            <b-input type="text" id="d_link" placeholder="디자이너 자격증 혹은 면허증" minlength="1" maxlength="50" required></b-input>
          </b-form-group>
          <!-- 일반유저 가입 시 노출 -->
          <b-form-group v-if="signUpType !== null && signUpType === 1" id="user-additional-info">
            <b-input type="text" id="u_phone" placeholder="연락처" minlength="1" maxlength="50" required></b-input>
            <b-input type="text" id="u_birthday" placeholder="생년월일" minlength="1" maxlength="50" required></b-input>
          </b-form-group>
          <div class="btn-section">
            <b-button type="submit" variant="primary">Create Account</b-button>
            <!-- <b-button v-on:click="getAccount">Create Account</b-button> -->
            <b-button v-on:click="goToBack">Go Back</b-button>
          </div>
        </b-form>

        <!-- TERMS AND CONDITIONS SECTION -->
        <div class='terms-condition-section'>
          <b-form-checkbox
            id="terms-all-agree"
            v-model="terms_all_agree"
            name="terms-all-agree"
            value="true"
            unchecked-value="false"
          >전체동의
          </b-form-checkbox>

          <p v-b-modal.modal-terms>개인정보 처리방침을 읽고 이에 동의합니다.</p>
          <b-modal id="modal-terms" scrollable title="개인정보 처리방침">
            <p class="modal-terms" v-for="i in 20" :key="i">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
          </b-modal>

          <p v-b-modal.modal-service-conditions>서비스 이용약관을 읽고 이에 동의합니다.</p>
          <b-modal id="modal-service-conditions" scrollable title="서비스 이용약관">
            <p class="modal-service-conditions" v-for="i in 20" :key="i">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
          </b-modal>

          <p v-b-modal.modal-info-conditions>개인정보 이용약관을 읽고 이에 동의합니다.</p>
          <b-modal id="modal-info-conditions" scrollable title="개인정보 이용약관">
            <p class="modal-info-conditions" v-for="i in 20" :key="i">
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
              in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
          </b-modal>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import authUtils from "../../middleware/authUtils.js";

export default {
  name: "SignUp",
  data() {
    return {
      terms_all_agree: false, // 이용약관 전체 동의유무 
      signUpType: null, // 가입 유형 -> 디자이너: 0 , 일반유저: 1
      // 가입 기본 입력정보 
      id: '',
      password: null, // input password 값
      email: null, // input email 값
      name: null,
      gender: null,
      gender_options: [
        { text: '남자', value: 'M' },
        { text: '여자', value: 'W' }
      ],
      // 디자이너 추가 입력정보
      designer: {
      // - 직급
      // - 현재 속해있는 매장 이름
      // - 현재 속해있는 매장 위치
      // - 현재 속해있는 매장 전화번호
      // - 휴무일
      // - 자신에게 예약할 수 있는 링크
      // - 디자이너 증서
      },
      // 일반유저 추가 입력정보
      user: {
      // - 핸드폰번호
      // - 생년월일
      // <옵션: 고객맞춤 디자이너 추천을 위한 추가 정보>
      // - 두피타입 (지성, 건성, 복합성, 등)
      // - 모발타입 (가는모, 굵은모, 곱슬, 반곱슬 등)
      // - 현재기장 (장발, 단발, 중단발 등)
      // - 얼굴형 (계란형, 사각턱, 뾰족턱, 둥근형 등)
      },
      validation_msg: {
        input_empty: "아래의 입력란을 정확하게 입력해주세요.",
        duplicate_account: "해당 계정은 이미 존재합니다.",
        perfect_account: "해당 정보로 가입하실 수 있습니다!",
        has_error: "에러가 발생했습니다. 잠시후에 다시 시도해주세요."
      },
      validation_code: null,
      apiAddr: this.$store.state.apiAddr,
      terms: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `,
      conditions1: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `,
      conditions2: `
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
          richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
          brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
          tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
          assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
          wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
          synth nesciunt you probably haven't heard of them accusamus labore VHS.
        `,  
    };
  },
  computed: {
    idValidation() {
      return this.id.length > 4 && this.id.length < 13
    }
  },
  mounted() {
    console.log(this.$store.state.apiAddr);
  },
  methods: {
    checkSignUpType: function(data) {
      this.signUpType = data;
    },
    onSubmit(evt) {
      evt.preventDefault()
      console.log('>>>>>> on submit');
      console.log(`ID: ${this.id}\nPASSWORD: ${this.password}\nEMAIL: ${this.email}\nNAME: ${this.name}`);
      // alert(JSON.stringify(this.form))
    },
    getAccount: function() {
      this.doSignUp();
    },
    doSignUp: function() {
      let result = this.validation();
      if (result) {
        console.log("=============================================");
        console.log(authUtils.getBasicToken(this.id, this.password));

        let postData = {
          // userId: this.idVal,
          // userPassword: this.pwdVal,
          email: this.email,
          name: this.name
        };

        axios
          .put(this.apiAddr + "/auth/signup", postData, {
            headers: {
              Authorization:
                "Basic " + authUtils.getBasicToken(this.id, this.password)
            }
          })
          .then(res => {
            console.log("response param data : ");
            console.log(res);

            if (res.status !== 200) {
              this.validation_code = "has_error";
            }

            if (res.data === "0000") {
              // 회원정보 있을 떄
              this.validation_code = "duplicate_account";
            } else if (res.data) {
              // 가입완료
              alert("가입완료!");
              this.goToBack();
            }
          });
      }
    },
    goToBack: function() {
      window.location.href = "../";
    },
    validation() {
      let returnVal = true;
      if (
        this.id === null ||
        this.email === null ||
        this.password === null ||
        this.name === null
      ) {
        this.validation_code = "input_empty";
        returnVal = false;
      }
      console.log("returnVal : " + returnVal);
      return returnVal;
    }
  }
};
</script>

<style lang='scss' scoped>
body {
  background: #3d516b;
}

.signup-form {
  margin: 0 auto;
  width: 90%;
  max-width: 600px;
  min-width: 300px;
  padding: 30px 0px;
  .before-signup-section {
    padding: 30px 0px;
    .title { 
      font-size: 28px;
    }
  }

  .terms-condition-section {
    padding: 30px 0px;
  }
}

/* form {
  width: 320px;
  padding: 60px 25px 80px;
  margin: 50px auto;
  background: #f8d348;
  display: flex;
  flex-direction: column;
} */

input {
  font-size: 16px;
  border: 0;
  border-radius: 5px;
  outline: 0;
  padding: 10px 15px;
  margin-top: 15px;
  border: 1px solid #ddd;
}
#gender {
  margin-top: 15px;
}
button {
  margin-top: 50px;
  padding: 10px 40px;
  border: none;
  border: 1px solid #ddd;
  background-color: #ddd;
  color: black;
}

button:hover {
  background-color: black;
  color: #fff;
}
// fade animation
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
