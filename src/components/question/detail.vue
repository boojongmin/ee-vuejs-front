<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <q-card>
          <q-card-title>
            {{jobQuestion.jobName}} 질문 상세
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list highlight>
              <q-list-header>인터뷰 질문</q-list-header>
              <q-card-main>
                <q-field icon="assignment ind" label="질문" helper="질문을 입력후 화살표를 눌러주세요" >
                  <q-input type="text" v-model="temp.question" @keyup.enter.native="insertQuestion"  :after="[ { icon: 'arrow_forward', content: true, handler: insertQuestion } ]"/>
                </q-field>
              </q-card-main>
              <q-card-separator />
              <template v-if="jobQuestion !== {}">
                <q-item v-for="(item, index) in jobQuestion.questions" :key="item.questions">
                  <!-- <q-item-side icon="" /> -->
                  <q-item-main>
                    <q-item-tile label>{{index + 1}}. {{item}}</q-item-tile>
                  </q-item-main>
                  <q-item-side right> <q-item-tile icon="keyboard arrow up" @click="moveQuestion(index, -1)"/> </q-item-side>
                  <q-item-side right> <q-item-tile icon="keyboard arrow down" @click="moveQuestion(index, 1)"/> </q-item-side>
                  <q-item-side right> <q-item-tile icon="delete" @click="deleteQuestion(index)"/> </q-item-side>
                </q-item>
              </template>
              <template v-else>
                <q-item> <q-item-side icon="note" /> <q-item-main>질문이 없습니다. </q-item-main> </q-item>
              </template>
            </q-list>
          </q-card-main>
        </q-card>
      </div> <!-- end row -->
    </div>
    <div class="row" style="margin-bottom: 30px;">
      <div class="col-md-12">
        <q-btn @click="createQuestion()" color="primary" big> <q-icon name="create"/> 직종별 질문 만들기 </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'quasar'
export default {
  data () {
    return {
      temp: {
        question: ''
      },
      questionIndex: -1
    }
  },
  computed: {
    jobQuestion () {
      let idx = this.questionIndex
      if (idx === -1) {
        return {}
      }
      else {
        return this.$store.state.question.jobQuestions[idx]
      }
    }
  },
  mounted: function () {
    this.questionIndex = this.$route.params.index
  },
  methods: {
    insertQuestion: function () {
      if (this.temp.question.length < 5) {
        Toast.create.negative('5글자 이상을 입력해주세요')
        return
      }
      this.jobQuestion.questions.push(this.temp.question)
      this.temp.question = ''
      Toast.create.positive('질문이 추가되었습니다.')
    },
    moveQuestion: function (index, addIndex) {
      let questions = this.jobQuestion.questions
      let length = questions.length
      let moveIndex = index + addIndex
      if (length <= 1 || moveIndex < 0 || moveIndex >= length) {
        return
      }
      let swap1 = questions[index]
      let swap2 = questions[moveIndex]
      questions.splice(moveIndex, 1, swap1)
      questions.splice(index, 1, swap2)
      Toast.create.positive('질문 순서가 변경되었습니다.')
    },
    deleteQuestion: function (index) {
      Dialog.create({
        title: 'Alert',
        message: '삭제하시겠습니까?',
        buttons: [
          {
            label: '확인',
            handler: () => this.jobQuestion.questions.splice(index, 1)
          },
          {
            label: '취소',
            handler () {
              console.log('aborting')
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
