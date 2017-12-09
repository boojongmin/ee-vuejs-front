<template>
  <div>
    <div class="row">
      <div class="col-md-12 text-right">
        <q-btn @click="moveForm()"> <q-icon name="create"/> create interviewset </q-btn>
        <p/>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <q-card>
          <q-card-title>
            Interviewset List
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list highlight>
              <q-list-header>interviewset list</q-list-header>
              <q-item v-for="(item, index) in interviewsetList" @click="showInterviewsetQuestions(index)">
                <q-item-side icon="note" color="green" />
                <q-item-main>
                   <q-item-tile label>{{item.label}}</q-item-tile> 
                </q-item-main>
                <q-item-side right>
                  <q-item-tile icon="keyboard arrow right" color="green"/>
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
        </q-card>
      </div> <!-- end row -->
      <div class="col-sm-12 col-md-6">
        <q-card>
          <q-card-title>
            Interviewset Detail
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list highlight>
              <q-list-header>JAVA 프로그래머 detail</q-list-header>
              <q-item v-for="(item, index) in questions"> {{index + 1}}. {{item.question}} </q-item>
            </q-list>
          </q-card-main>
          <q-card-separator />
          <div class="row text-right">
            <div class="col-12">
              <q-btn @click="$router.push('/interviewset/request-interview')" color="primary">request interview</q-btn>
            </div>
          </div>
        </q-card>
      </div> <!-- end row -->
    </div>
  </div>
</template>

<script>
import * as mType from '../../store/mutation-types.js'
import * as gType from '../../store/getter-types.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      questionIndex: -1,
      modal: {
        open: false
      }
    }
  },
  computed: {
    ...mapGetters({
      interviewsetList: gType.INTERVIEWSET_LIST
    }),
    questions: function () {
      if (this.questionIndex === -1) {
        return []
      }
      else {
        let list = this.interviewsetList[this.questionIndex].tags
        console.log('list', list)
        let result = []
        for (var i = 0; i < list.length; i++) {
          list[i].questions.forEach(x => result.push(x))
        }
        return result
      }
    }
  },
  methods: {
    moveForm () {
      this.$store.commit(mType.INTERVIEWSET_INIT)
      this.$router.push('/interviewset/form')
    },
    showInterviewsetQuestions (index) {
      this.questionIndex = index
      console.log(this.questionIndex)
    }
  }
}
</script>
<style>
</style>
