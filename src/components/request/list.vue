<template>
  <div>
    <div class="row">  
      <div class="col-sm-12 col-md-6">
        <q-card>
          <q-card-title>
             인터뷰 요청
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list highlight>
              <q-list-header>인터뷰 질문 목록중 하나를 선택해주세요</q-list-header>
              <template v-if="jobQuestions.length > 0">
                <q-item v-for="(item, index) in jobQuestions" :key="item.id" @click="requestInterview(item.id)">
                  <q-item-side icon="note" color="green" />
                  <q-item-main>
                    <q-item-tile label>{{item.jobName}}</q-item-tile> 
                  </q-item-main>
                  <q-item-side right>
                    <q-item-tile icon="keyboard arrow right" color="green"/>
                  </q-item-side>
                </q-item>
              </template>
              <template v-else>
                <q-item>
                  <q-item-side icon="note" />
                  <q-item-main>직종별 질문이 등록되지 않았습니다. <q-btn @click="createQuestion()" color="primary"> <q-icon name="create"/> 직종별 질문 만들기 </q-btn> 버튼을 통해 질문을 생성해주세요</q-item-main>
                </q-item>
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
import * as aType from '../../store/action-types'

export default {
  data () {
    return {
    }
  },
  computed: {
    jobQuestions () {
      return this.$store.state.question.jobQuestions
    }
  },
  methods: {
    requestInterview (jobQuestionId) {
      this.$store.dispatch(aType.QM_DETAILS, jobQuestionId)
      this.$router.push('/request/create')
    },
    createQuestion () {
      this.$router.push('/question/create')
    }
  }
}
</script>

<style>
</style>
