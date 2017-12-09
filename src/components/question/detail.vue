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
              <template v-if="jobQuestion !== {}">
                <q-item v-for="(item, index) in jobQuestion.questions">
                  <!-- <q-item-side icon="" /> -->
                  <q-item-main>
                    <q-item-tile label>{{index + 1}}. {{item}}</q-item-tile> 
                  </q-item-main>
                  <q-item-side right> <q-item-tile icon="keyboard arrow up" @click="moveQuestion(index, -1)"/> </q-item-side>
                  <q-item-side right> <q-item-tile icon="keyboard arrow down" @click="moveQuestion(index, 1)"/> </q-item-side>
                  <q-item-side right> <q-item-tile icon="delete" @click="questions.splice(index, 1)"/> </q-item-side>
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
export default {
  data () {
    return {
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
    }
  }
}
</script>

<style>
</style>
