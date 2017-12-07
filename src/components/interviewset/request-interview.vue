<template>
  <div class="row">
    <div class="col-md-12 text-right">
      <q-card>
        <q-card-title>request interview</q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-field icon="assignment ind" label="Name" helper="type name" :error="$v.name.$error" error-label="please input name" >
            <q-input type="text" v-model="name" @blur="$v.name.$touch" />
          </q-field>
          <q-field icon="mail" label="Email" helper="type email" :error="$v.email.$error" error-label="please input email" >
            <q-input type="email" v-model="email" @blur="$v.email.$touch" />
          </q-field>
          <q-field icon="phone" label="phone number" helper="type phone" :error="$v.phoneNumber.$error" error-label="please input phone" >
            <q-input type="tel" v-model="phoneNumber" @blur="$v.phoneNumber.$touch" />
          </q-field>
          <q-btn color="green" @click="sendRequestInterview">인터뷰요청하기</q-btn>
          <q-btn color="red" @click="$router.go(-1)">취소</q-btn>
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-6">
      <q-card>
        <q-card-title>SMS request preview</q-card-title>
        <q-card-separator />
        <q-card-main>
          <blockquote>
            <p>~님 XXX회사로부터 인터뷰 요청이 왔습니다. loginterview.com에서 응답해주세요</p>
          </blockquote>
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-6">
      <q-card>
        <q-card-title>Mail request preview</q-card-title>
        <q-card-separator />
        <q-card-main>
          <blockquote>
            <p>안녕하세요 ~님 <br>
              XXX회사로부터 인터뷰 요청이 왔습니다. loginterview.com에서 응답해주세요
              <br><br>
              <a href="">링크</a>  
            </p>
          </blockquote>
        </q-card-main>
      </q-card>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { Dialog } from 'quasar'

export default {
  data () {
    return {
      name: '',
      email: '',
      phoneNumber: ''
    }
  },
  validations: {
    name: { required },
    email: { required, email },
    phoneNumber: { required }
  },
  methods: {
    sendRequestInterview: function () {
      let that = this
      Dialog.create({
        title: 'Confirm',
        message: 'SMS와 메일로 인터뷰 요청을 전송합니다.',
        buttons: [
          {
            label: '확인',
            handler () {
              console.log(that)
              that.$v.$touch()
              if (that.$v.$error) {
                Dialog.create({
                  title: 'Alert',
                  message: '입력값이 충분하지 않습니다.'
                })
              }
              console.log('Agreed!')
            }
          },
          {
            label: '취소',
            handler () {
              console.log('Disagreed...')
            }
          }
        ]
      })
    }
  }
}
</script>
<style>
</style>
