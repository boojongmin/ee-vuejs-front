<template>
  <div>
    <div class="row" style="margin-bottom: 30px;">
      <div class="col-md-12 text-right">
        <q-btn @click="createQuestion()" color="primary" big> <q-icon name="create"/>질문 생성</q-btn>
      </div>
    </div>
    <div class="row">  
      <div class="col-sm-12 col-md-12">
        <q-card>
          <q-card-title>
            직종별 질문 목록
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list highlight>
              <q-list-header>interviewset list</q-list-header>
              <template v-if="jobQuestions.length > 0">
                <q-item v-for="(item, index) in jobQuestions" @click="moveQuestionDetails(item.id)" :key="item.jobName">
                  <q-item-side icon="note" />
                  <q-item-main>
                    <q-item-tile label>{{item.jobName}}</q-item-tile> 
                  </q-item-main>
                  <q-item-side right>
                    <q-item-tile icon="keyboard arrow right" />
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
    
  </div>
</template>

<script>
import * as aType from '../../store/action-types.js'
// import * as mType from '../../store/mutation-types.js'

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
    createQuestion: function () {
      this.$router.push('/question/create')
    },
    moveQuestionDetails: function (jobQuestionId) {
      // this.$store.commit(mType.QM_JOB_QUESTION_ID, jobQuestionId)
      this.$store.dispatch(aType.QM_DETAILS, jobQuestionId)
      this.$router.push('/question/detail')
    }
  },
  mounted: function () {
    this.$store.dispatch(aType.QM_LIST)
  }
}
</script>

<style>
</style>
