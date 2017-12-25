<template>
  <div>
    <div class="row">
      <div class="col-md-10">
        <q-card>
          <q-card-title>직종별 질문 만들기</q-card-title>
          <q-card-separator />
          <q-card-main>
            <template v-if="jobName === ''">
              <q-field icon="assignment ind" :labelWidth="3" label="직종명" helper="직종명을 입력후 화살표를 눌러주세요" >
                <q-input type="text" v-model="temp.jobName" @keyup.enter.native="insertJobName"  :after="[ { icon: 'arrow_forward', content: true, handler: insertJobName } ]"/>
              </q-field>
            </template>
            <template v-else>
              <q-field icon="assignment ind" :labelWidth="3" label="직종명" > 
                {{jobName}}
                <q-icon name="mode edit" size="2em" style="float:right;" @click="modifyJobName"/>
              </q-field>
            </template>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row" v-if="jobName !== ''">
      <div class="col-md-10">
        <q-card>
          <q-card-title> 질문 입력 </q-card-title>
          <q-card-main>
              <q-field icon="assignment ind" label="질문" helper="질문을 입력후 화살표를 눌러주세요" >
                <q-input type="text" v-model="temp.question" @keyup.enter.native="insertQuestion"  :after="[ { icon: 'arrow_forward', content: true, handler: insertQuestion } ]"/>
              </q-field>
          </q-card-main>
          <q-card-separator />
          <q-card-main>
            <q-list>
              <q-list-header>질문 목록(subLabel 글자가 작은지 체크)</q-list-header>
              <q-item v-for="(item, index) in questions" multiline :key="item.label">
                <!--<q-item-side icon="note" />-->
                <q-item-main>
                  <q-item-tile label>질문 <span>{{index + 1}}</span></q-item-tile>
                  <q-item-tile sublabel>
                   {{item}}
                  </q-item-tile>
                </q-item-main>
                <!--<q-item-main>-->
                  <!--<q-item-tile sublabel>{{item}}</q-item-tile>-->
                <!--</q-item-main>-->
                <q-item-side right> <q-item-tile icon="keyboard arrow up" @click="moveQuestion(index, -1)"/> </q-item-side>
                <q-item-side right> <q-item-tile icon="keyboard arrow down" @click="moveQuestion(index, 1)"/> </q-item-side>
                <q-item-side right> <q-item-tile icon="delete" @click="deleteQuestion(index)"/> </q-item-side>

              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row" v-if="questions.length > 0">
      <div class="col-md-10 text-right">
        <q-btn @click="doneToCreateQuestion">직종별 질문 생성 완료</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'quasar'
import api from '../../api/question'

export default {
  data () {
    return {
      temp: {
        jobName: '',
        question: ''
      },
      jobName: '',
      questions: [],
      isUpdate: false
    }
  },
  methods: {
    modifyJobName: function () {
      this.jobName = ''
    },
    insertJobName: function () {
      if (this.temp.jobName.length < 5) {
        Toast.create.negative('5글자 이상을 입력해주세요')
        return
      }
      this.jobName = this.temp.jobName
      Toast.create.positive(this.jobName + '직업명이 저장되었습니다.')
    },
    insertQuestion: function () {
      if (this.temp.question.length < 5) {
        Toast.create.negative('5글자 이상을 입력해주세요')
        return
      }
      this.questions.push(this.temp.question)
      this.temp.question = ''
      Toast.create.positive('질문이 추가되었습니다.')
    },
    moveQuestion: function (index, addIndex) {
      let length = this.questions.length
      let moveIndex = index + addIndex
      if (length <= 1 || moveIndex < 0 || moveIndex >= length) {
        return
      }
      let swap1 = this.questions[index]
      let swap2 = this.questions[moveIndex]
      this.questions.splice(moveIndex, 1, swap1)
      this.questions.splice(index, 1, swap2)
      Toast.create.positive('질문 순서가 변경되었습니다.')
    },
    deleteQuestion: function (index) {
      if (confirm('삭제하시겠습니까?')) {
        this.questions.splice(index, 1)
      }
    },
    doneToCreateQuestion: function () {
      const jobQuestions = {
        jobName: this.jobName,
        questions: Object.assign([], this.questions)
      }
      api.createQuestion(jobQuestions)
        .then(x => { this.$router.push('/question') })
        .catch(e => Toast.negative.create('질문 생성되지 않았습니다.'))
    }
  }
}
</script>

<style>
</style>
