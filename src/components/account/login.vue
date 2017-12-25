<template>
  <q-card>
    <q-card-media>
      <img src="~assets/logo.png" width="50%">
    </q-card-media>
    <q-card-title class="text-center">
      <h5>로그인</h5>
    </q-card-title>
    <q-card-main>
      <q-field label="아이디" >
        <q-input type="text" v-model="email" @keyup.enter.native="doLogin"/>
      </q-field>
      <q-field label="패스워드">
        <q-input type="text" v-model="password" @keyup.enter.native="doLogin"/>
      </q-field>
      <div class="row">
        <div class="col-6 text-left">
          <q-btn color="red" @click="$router.push('/join')">회원가입</q-btn>
        </div>
        <div class="col-6 text-right">
          <q-btn color="blue" @click="doLogin()">로그인</q-btn>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script type="text/javascript">
/* eslint-disable */
import { mapActions } from 'vuex'
import * as aType from '../../store/action-types.js'
import {Toast} from 'quasar'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({
      login: aType.AUTH_LOGIN
    }),
    doLogin: function () {
      let cb = (token) => {
        localStorage.setItem('ee.jwt', token)
        this.$router.push('/dashboard')
      }
      let errorCb = () => Toast.create.negative('아이디, 패스워드가 일치하지 않거나 존재하지 않는 계정입니다.')
      this.login({email: this.email, password: this.password, cb, errorCb})
    }

  }
}
</script>
<style>
</style>