<template>
  <div>
    <div class="row">  
      <div class="col-sm-12 col-md-6">
        <q-card>
          <q-card-title>
            직종별 질문 목록
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list highlight>
              <q-list-header>interviewset list</q-list-header>
              <template v-if="jobQuestions.length > 0">
                <q-item v-for="(item, index) in jobQuestions" @click="$router.push('/question/detail/' + index)" :key="item.jobName">
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
    <div class="row" style="margin-bottom: 30px;">
      <div class="col-md-12">
        <q-btn @click="createQuestion()" color="primary" big> <q-icon name="create"/> 직종별 질문 만들기 </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>

<style>
</style>
