<template>
  <q-card>
    <q-card-media>
      <img src="~assets/quasar-logo-full.svg">
    </q-card-media>
    <q-card-title class="text-center">
      <h5>계정 생성</h5>
    </q-card-title>
    <q-card-main>
      <q-field label="회사메일주소" > <q-input type="text" v-model="email"/> </q-field>
      <q-field label="패스워드"> <q-input type="text" v-model="password1"/> </q-field>
      <q-field label="패스워드(확인)"> <q-input type="text" v-model="password2"/> </q-field>
      <q-field label="이름" > <q-input type="text" v-model="username"/> </q-field>
      <q-field label="회사명" > <q-input type="text" v-model="username"/> </q-field>
      <q-field label="" > <q-input type="text" v-model="companyName" /> </q-field>
      <div class="row">
        <div class="col-6 text-left">
          <q-btn color="red" @click="$router.back()">취소</q-btn>
        </div>
        <div class="col-6 text-right">
          <q-btn color="blue">계정생성</q-btn>
        </div>
      </div>
    </q-card-main>
  </q-card>
</template>

<script type="text/javascript">
/* eslint-disable */
export default {
  data () {
    return {
      email: '',
      password1: '',
      password2: '',
      username: '',
      companyName: ''
    }
  }
}
</script>
<style>
</style>