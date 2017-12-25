<template>
  <div>
    <div class="row">
      <div class="col-md-10">
        <q-card>
          <q-card-title>인터뷰 요청하기</q-card-title>
          <q-card-separator />
          <q-card-main>
            <template v-if="jobQuestion !== {}">
              <q-item v-for="(item, index) in questions" :key="item.id">
                <!-- <q-item-side icon="" /> -->
                <q-item-main> <q-item-tile label>{{index + 1}}. {{item.message}}</q-item-tile> </q-item-main> </q-item>
            </template>
            <template v-else>
              <q-item> <q-item-side icon="note" /> <q-item-main>질문이 없습니다. </q-item-main> </q-item>
            </template>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 text-right">
        <q-card>
          <q-card-title>request interview</q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-field icon="assignment ind" label="이름" helper="이름을 입력해주세요.">
              <q-input type="text" v-model="request.name" />
            </q-field>
            <q-field icon="mail" label="Email" helper="메일주소를 입력해주세요.">
              <q-input type="email" v-model="request.email"/>
            </q-field>
            <q-field icon="phone" label="phone number" helper="전화번호를 입력해주세요.">
              <q-input type="tel" v-model="request.phoneNumber" />
            </q-field>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-md-10">
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
      <div class="col-md-10">
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
          <q-card-separator />
          <q-card-main class="text-right">
            <q-btn color="green">인터뷰요청하기</q-btn>
            <q-btn color="red" @click="$router.go(-1)">취소</q-btn>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'quasar'
import * as gType from '../../store/getter-types'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      jobQuestionId: -1,
      request: {
        name: '',
        email: '',
        phoneNumber: ''
      },
      temp: { }
    }
  },
  computed: {
    ...mapGetters({
      jobQuestion: gType.QM_JOB_QUESTION,
      questions: gType.QM_QUESTION_LIST
    })
  },
  methods: {
    // insertJobName: function () {
    //   if (this.temp.jobName.length < 5) {
    //     Toast.create.negative('5글자 이상을 입력해주세요')
    //     return
    //   }
    //   this.jobName = this.temp.jobName
    //   Toast.create.positive(this.jobName + '직업명이 입력되었습니다.')
    // },
    // insertQuestion: function () {
    //   if (this.temp.question.length < 5) {
    //     Toast.create.negative('5글자 이상을 입력해주세요')
    //     return
    //   }
    //   this.questions.push(this.temp.question)
    //   this.temp.question = ''
    //   Toast.create.positive('질문이 추가되었습니다.')
    // },
    // moveQuestion: function (index, addIndex) {
    //   let length = this.questions.length
    //   let moveIndex = index + addIndex
    //   if (length <= 1 || moveIndex < 0 || moveIndex >= length) {
    //     return
    //   }
    //   let swap1 = this.questions[index]
    //   let swap2 = this.questions[moveIndex]
    //   this.questions.splice(moveIndex, 1, swap1)
    //   this.questions.splice(index, 1, swap2)
    //   Toast.create.positive('질문 순서가 변경되었습니다.')
    // },
    // doneToCreateQuestion: function () {
    //   this.jobQuestions.push({
    //     id: this.jobQuestions.length + 1,
    //     jobName: this.jobName,
    //     questions: Object.assign([], this.questions)
    //   })
    //   this.$router.push('/question')
    // }
  }
}
</script>

<style>
</style>
