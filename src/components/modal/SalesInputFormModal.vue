<template>
    <div class="salse-input-form-modal-wrapper">
        <b-button v-b-modal.modal-scrollable>Launch scrolling modal</b-button>
        <b-modal id="modal-scrollable" scrollable title="Scrollable Content">
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
            <!-- <p class="my-4" v-for="i in 20" :key="i">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p> -->
        </b-modal>
    </div>
</template>

<script>
export default {
  name: 'SalesInputFormModal',
  data () {
    return {
    }
  },
  components: {},
  created () {
    // 현재 로그인상태인지 체크
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
