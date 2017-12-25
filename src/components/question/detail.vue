<template>
  <div>
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <q-card>
          <q-card-title>
            {{jobQuestion.jobName}}
            <!-- <q-icon name="mode edit" size="2em"  style="float:right"/> -->
            <q-btn @click="modifyJobQuestion()" style="float:right;">수정</q-btn>
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list highlight>
              <q-list-header>인터뷰 질문</q-list-header>
              <q-card-separator />
              <template v-if="jobQuestion !== {}">
                <q-item v-for="(item, index) in questionDetails" :key="item.id">
                  <q-item-main>
                    <q-item-tile label>{{index + 1}}. {{item.message}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </template>
              <template v-else>
                <q-item> <q-item-side icon="note" /> <q-item-main>질문이 없습니다. </q-item-main> </q-item>
              </template>
            </q-list>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast, Dialog } from 'quasar'
import * as gType from '../../store/getter-types'
import {mapGetters} from 'vuex'
import api from '../../api/question.js'

export default {
  data () {
    return {
      questionDetails: [],
      temp: {
        question: ''
      },
      questionIndex: -1
    }
  },
  computed: {
    ...mapGetters({jobQuestion: gType.QM_JOB_QUESTION})
  },
  mounted: function () {
    api.details(this.jobQuestion.id).then(list => { this.questionDetails = list })
  },
  methods: {
    modifyJobQuestion: function () {
      this.$router.push('/question/update')
    }
  }
  //   insertQuestion: function () {
  //     if (this.temp.question.length < 5) {
  //       Toast.create.negative('5글자 이상을 입력해주세요')
  //       return
  //     }
  //     this.jobQuestion.questions.push(this.temp.question)
  //     this.temp.question = ''
  //     Toast.create.positive('질문이 추가되었습니다.')
  //   },
  //   moveQuestion: function (index, addIndex) {
  //     let questions = this.jobQuestion.questions
  //     let length = questions.length
  //     let moveIndex = index + addIndex
  //     if (length <= 1 || moveIndex < 0 || moveIndex >= length) {
  //       return
  //     }
  //     let swap1 = questions[index]
  //     let swap2 = questions[moveIndex]
  //     questions.splice(moveIndex, 1, swap1)
  //     questions.splice(index, 1, swap2)
  //     Toast.create.positive('질문 순서가 변경되었습니다.')
  //   },
  //   deleteQuestion: function (index) {
  //     Dialog.create({
  //       title: 'Alert',
  //       message: '삭제하시겠습니까?',
  //       buttons: [
  //         {
  //           label: '확인',
  //           handler: () => this.jobQuestion.questions.splice(index, 1)
  //         },
  //         {
  //           label: '취소',
  //           handler () {
  //             console.log('aborting')
  //           }
  //         }
  //       ]
  //     })
  //   }
  // }
}
</script>

<style>
</style>
