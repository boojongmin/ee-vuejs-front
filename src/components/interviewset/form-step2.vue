<template>
  <div>
    <div class="row">
      <div class="col-12 text-right">
        <q-btn @click="$router.go(-1)">Go back</q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <q-card>
          <q-card-title>Add/Choose your {{interviewsetTag.label}} Questions</q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-data-table :data="allQuestions" :config="config" :columns="columns" >
            <!-- <q-data-table :data="table" :config="config" :columns="columns" @refresh="refresh" > -->
              <!-- Custom renderer for "message"   column -->
              <template slot="col-question" scope="cell">
                <span>{{cell.data}}</span>
              </template>
               <!-- <q-btn color="primary" @click='doSomethingMethod(cell.row.id)'>View</q-btn> -->
              <template slot="col-choose" scope='cell'>
                <template v-if="cell.row.choose === true">
                  <q-btn color="primary" @click="toggleChoice(cell.row)">선택됨</q-btn>
                </template>
                <template v-if="cell.row.choose != true">
                  <q-btn color="primary" outline @click="toggleChoice(cell.row)">선택</q-btn>
               </template>
              </template>
            </q-data-table>
          </q-card-main>
          <q-card-separator />
          <q-card-title> {{interviewsetTag.label}} 커스텀 질문 </q-card-title>
          <q-card-main>
            <q-field icon="assignment ind" label="interviewset name" helper="type name" >
              <q-input type="text" v-model="customQuestion" placeholder="insert customer questions"  :after="[{icon: 'arrow_forward', content: true, handler: addCustomQuestion }]" />
            </q-field>
          </q-card-main>
          <q-card-separator />
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card>
          <q-card-title>{{interviewsetTag.label}} Question preview</q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list>
              <template v-if="questions.length === 0">
                <q-item> 선택된 질문이 없습니다. </q-item>
              </template>
              <template v-for="(item, index) in questions">
                <q-item>
                  <q-item-main>{{index + 1}}. {{ item.question }}</q-item-main>
                  <q-item-side right>
                    <q-item-tile icon="arrow upward" @click="moveQuestion(item.id, 'up')"/>
                  </q-item-side>
                  <q-item-side right>
                    <q-item-tile icon="arrow downward" @click="moveQuestion(item.id, 'down')"/>
                  </q-item-side>
                  <q-item-side right>
                    <q-item-tile icon="delete" @click="removeQuestionFromList(index, item.id)"/>
                  </q-item-side>
                </q-item>
                <q-item-separator/>
              </template>
            </q-list>
          </q-card-main>
          <q-card-separator/>
          <q-card-main>
            <q-btn color="primary" style="width: 100%;" @click="doneCreateQuestion">{{ interviewsetTag.label }} Question 태그 질문 완료</q-btn>
          </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as gType from '../../store/getter-types.js'
import * as mType from '../../store/mutation-types.js'

function getQuestions (tagKey) {
  let result = []
  for (var i = 1; i <= 20; i++) {
    result.push({id: i, question: '1분 자기소개' + i, choose: false})
  }
  return result
}

export default {
  mounted: function () {
    let selectedTag = this.$route.params.key
    this.$store.commit(mType.INTERVIEWSET_UPDATE_SELECTED_TAG, selectedTag)
    this.selectedTag = selectedTag
    this.$nextTick(() => {
      if (this.interviewsetTag.key === undefined) {
        this.$router.push('/interviewset/list')
      }
    })
    this.allQuestions = getQuestions(selectedTag)
    if (this.questions.length > 0) {
      for (let i = 0; i < this.questions.length; i++) {
        let id = this.questions[i].id
        this.allQuestions.forEach(x => {
          if (x.id === id) {
            x.choose = true
          }
        })
      }
    }
    this.interviewsetTags.filter(x => x.key === selectedTag)
      .forEach(x => {
        this.interviewsetTag = x
      })
  },
  data () {
    return {
      selectedTag: '',
      allQuestions: [],
      customQuestion: '',
      config: {
        rowHeight: '50px',
        title: 'choose your questions',
        noHeader: false,
        refresh: false,
        columnPicker: false,
        bodyStyle: {
          maxHeight: '300px'
        },
        responsive: true,
        messages: {
          noData: '<i>warning</i> No data available to show.',
          noDataAfterFiltering: '<i>warning</i> No results. Please refine your search terms.'
        },
        labels: {
          columns: 'Coluuuuumns',
          allCols: 'Eeeeeeeeevery Cols',
          rows: 'Rooows',
          selected: {
            singular: 'item selected.',
            plural: 'items selected.'
          },
          search: 'Search',
          all: 'All'
        }
      },
      columns: [
        {
          label: 'questsion',
          field: 'question',
          width: '*',
          type: 'string'
        },
        {
          label: 'choose',
          field: 'choose',
          width: '100px'
        }
      ],
      name: '',
      terms: '',
      interviewsetTag: {}
    }
  },
  computed: {
    ...mapGetters({
      interviewsetTags: gType.INTERVIEWSET_TAGS,
      questions: gType.INTERVIEWSET_TAG_QUESTIONS
    })
  },
  methods: {
    toggleChoice: function (row) {
      let list = this.allQuestions.filter(x => x.id === row.id)
      if (list.length > 0) {
        let item = list[0]
        item.choose = !item.choose
        if (item.choose) {
          this.questions.push(item)
        }
        else {
          let index = this.questions.findIndex(x => x.id === row.id)
          this.questions.splice(index, 1)
        }
      }
    },
    removeQuestionFromList: function (index, id) {
      if (confirm('질문 목록에서 제외하시겠습니까?')) {
        let list = this.questions.filter(x => x.id === id)
        if (list.length > 0) {
          this.questions.splice(index, 1)
          let subList = this.allQuestions.filter(x => x.id === id)
          if (subList.length > 0) {
            subList[0].choose = false
          }
        }
      }
    },
    moveQuestion: function (id, direction) {
      alert('언젠가는 구현할게요~')
      if (direction === 'up') {

      }
      else {

      }
    },
    addCustomQuestion: function () {
      this.questions.push({
        id: 0,
        question: this.customQuestion
      })
    },
    doneCreateQuestion: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
