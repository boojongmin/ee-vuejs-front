<template>
  <div>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-title>인터뷰 요청하기</q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list v-if="jobQuestion !== {}" no-border multiline dense>
              <q-item v-for="(item, index) in questions" :key="item.id">
                <!-- <q-item-side icon="" /> -->
                <q-item-main> <q-item-tile label>{{index + 1}}. {{item.message}}</q-item-tile> </q-item-main> 
              </q-item>
              <q-item>
                <q-item-main></q-item-main>
                <q-item-side  v-if="moreJobQuestons == false" @click="moreJobQuestons = true">더보기</q-item-side>
              </q-item>
            </q-list>
            <template v-else>
              <q-item> <q-item-side icon="note" /> <q-item-main>질문이 없습니다. </q-item-main> </q-item>
            </template>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-right">
        <q-card>
          <q-card-title>인터뷰 요청 대상 정보를 입력해주세요.</q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-field icon="assignment ind" label="이름" helper="이름을 입력해주세요.(2~6자)" @blur="$v.request.name.$touch()" :error="$v.request.name.$error">
              <q-input type="text" v-model="request.name" />
            </q-field>
            <q-field icon="mail" label="Email" helper="메일주소를 입력해주세요.">
              <q-input type="email" v-model="request.email" @blur="$v.request.$touch()" :error="$v.request.email.$error"/>
            </q-field>
            <q-field icon="phone" label="phone number" helper="전화번호를 입력해주세요.(숫자만 입력해주세요)">
              <q-input type="number" v-model="request.phoneNumber" @blur="$v.request.$touch()" :error="$v.request.phoneNumber.$error"/>
            </q-field>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-12" v-if="request.email != ''">
        <q-card>
          <q-card-title>SMS request preview</q-card-title>
          <q-card-separator />
          <q-card-main>
            <blockquote>
              <p>{{request.name}}님 XXX회사로부터 인터뷰 요청이 왔습니다. 이메일({{request.email}})을 확인해주세요.</p>
            </blockquote>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-12">
        <q-card v-if="request.phoneNumber != ''">
          <q-card-title>Mail request preview</q-card-title>
          <q-card-separator />
          <q-card-main>
            <blockquote>
              <p>안녕하세요 {{request.name}}님 <br>
                XXX회사로부터 인터뷰 요청이 왔습니다. loginterview.com에서 응답해주세요
                ---<br>
                ---<br>
                솰솨솰라 loginterview 소개<br>
                ---<br>
                ---<br>
                <br><br>
                <a href="https://interviewer.loginterivew.com">링크</a>  
              </p>
            </blockquote>
          </q-card-main>
          <q-card-separator />
        </q-card>
      </div>
    </div>
    <div class="row" style="margin: 10px;">
      <div class="col-md-12 text-right">
        <q-btn color="primary" @click="createRequest()">인터뷰요청하기</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'quasar'
import * as gType from '../../store/getter-types'
import {mapGetters} from 'vuex'
import {Toast} from 'quasar'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'

function checkPhoneNumber (phoneNumber) {
  const re = /^[0-9]{10,11}$/
  if (re.test(phoneNumber)) {
    return true
  }
  return false
}

export default {
  data () {
    return {
      moreJobQuestons: false,
      jobQuestionId: -1,
      request: {
        name: '부종민',
        email: 'asdf@asdf.com',
        phoneNumber: '01043210030'
      },
      temp: { }
    }
  },
  computed: {
    ...mapGetters({
      jobQuestion: gType.QM_JOB_QUESTION
    }),
    questions () {
      if (this.moreJobQuestons) {
        return this.$store.state.question.questions
      }
      else {
        return this.$store.state.question.questions.slice(0, 3)
      }
    }
  },
  validations: {
    request: {
      name: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(6)
      },
      email: {required, email},
      phoneNumber: {required, checkPhoneNumber}
    }
  },
  methods: {
    createRequest: function () {
      this.$v.request.$touch()
      if (this.$v.request.$invalid === false) {
        const interviewer = {
          jobQuestionId: this.jobQuestion.id,
          name: this.request.name,
          email: this.request.email,
          phoneNumber: this.request.phoneNumber
        }
        if (this.jobQuestion.id === undefined) {
          alert('오류가 발생했습니다.')
          this.$router.push('/dashboard')
          return
        }
        axios.post('/api/auth/ee/request', interviewer, {headers: {Authorization: 'Bearer ' + localStorage.getItem('ee.jwt')}})
          .then(r => r.data)
          .then(x => { Toast.create.positive('인터뷰 요청이 완료되었습니다.') })
          .catch(e => { Toast.create.negative('인터뷰 요청에 오류중 오류가 발생했습니다.') })
      }
    }
  },
  mounted: function () {
    if (this.jobQuestion.id === undefined) {
      this.$router.push('/request')
    }
  }
}
</script>
<style>
</style>
