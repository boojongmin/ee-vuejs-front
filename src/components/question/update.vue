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
    <div class="row">
      <div class="col-md-10">
        <q-card>
          <q-card-title> 질문 </q-card-title>
          <q-card-main>
            <q-list>
              <q-list-header>질문 목록(subLabel 글자가 작은지 체크)</q-list-header>
              <q-item v-for="(item, index) in filteredQuestions" multiline :key="item.id">
                <!--<q-item-side icon="note" />-->
                <q-item-main>
                  <q-item-tile label>질문 <span>{{index + 1}}</span></q-item-tile>
                  <q-item-tile sublabel>
                   {{item.message}}
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
          <q-card-main>
              <q-field icon="assignment ind" label="질문" helper="질문을 입력후 화살표를 눌러주세요" >
                <q-input type="text" v-model="temp.question" @keyup.enter.native="insertQuestion"  :after="[ { icon: 'arrow_forward', content: true, handler: insertQuestion } ]"/>
              </q-field>
          </q-card-main>
          <q-card-separator />
          <q-card-main class="text-right">
            <q-btn round color="primary" @click="updateToCreateQuestion">저장</q-btn>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'quasar'
import api from '../../api/question'
import * as aType from '../../store/action-types'
import * as gType from '../../store/getter-types'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      temp: {
        jobName: '',
        question: ''
      },
      questions: []
    }
  },
  computed: {
    ...mapGetters({ jobQuestion: gType.QM_JOB_QUESTION }),
    jobName: {
      get: function () {
        return this.jobQuestion.jobName
      },
      set: function (jobName) {
        this.jobQuestion.jobName = jobName
      }
    },
    filteredQuestions: function () {
      return this.questions.filter(x => x.use === true)
    }
  },
  mounted: function () {
    if (this.jobQuestion === {}) {
      this.$router.push('/question')
    }
    this.temp.jobName = this.jobQuestion.jobName
    api.details(this.jobQuestion.id).then(list => { this.questions = list })
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
      // Toast.create.positive(this.jobName + '직업명이 저장되었습니다.')
    },
    insertQuestion: function () {
      if (this.temp.question.length < 5) {
        Toast.create.negative('5글자 이상을 입력해주세요')
        return
      }
      // TODO use == false인 questionDetai은  orderNumber를 세지 않아 orderNumber가 겹치는 버그(?)가 있다.
      this.questions.push(Object.assign({}, { id: 0, message: this.temp.question, use: true, orderNumber: (this.questions[this.questions.length - 1].orderNumber + 1) }))
      this.temp.question = ''
      // Toast.create.positive('질문이 추가되었습니다.')
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
      let tempOrderNumber = swap1.orderNumber
      swap1.orderNumber = swap2.orderNumber
      swap2.orderNumber = tempOrderNumber
      Toast.create.positive('질문 순서가 변경되었습니다.')
    },
    deleteQuestion: function (index) {
      if (confirm('삭제하시겠습니까?')) {
        this.questions[index].use = false
      }
    },
    updateToCreateQuestion: function () {
      const jobQuestion = Object.assign({}, this.jobQuestion)
      const questions = Object.assign([], this.questions)
      api.updateQuestion({ jobQuestion, questions })
        .then((x) => {
          Toast.create.positive('저장되었습니다.')
          this.$store.dispatch(aType.QM_DETAILS, jobQuestion.id)
          this.$router.push('/question/detail')
        })
        .catch(e => { Toast.create.negative('저장에 실패했습니다.(서버)') })
    }
  }
}
</script>

<style>
</style>
