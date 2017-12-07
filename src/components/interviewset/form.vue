<template>
  <div>
    <div class="row">
      <div class="col-12 text-right">
        <q-btn @click="$router.go(-1)">Go List</q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <q-card>
          <q-card-title>Create Interviewset</q-card-title>
          <q-card-separator />
          <q-card-main>
            <template v-if="hasInterviewsetName">
              <q-field icon="assignment ind" label="interviewset name" > {{interviewsetName}} </q-field>
            </template>
            <template v-else>
              <q-field icon="assignment ind" label="interviewset name" helper="type name" >
                <q-input type="text" v-model="name"/>
              </q-field>
            </template>
          </q-card-main>
          <q-card-main>
            <template v-if="hasInterviewsetName === false">
              <q-card-separator />
                <q-btn color="primary" style="width: 100%" @click="updateName">Next</q-btn>
              </template>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row" v-if="hasInterviewsetName">
      <div class="col-md-6">
        <q-card>
          <q-card-title>Search tag</q-card-title>
          <q-card-main>
            <q-search inverted color="secondary" v-model="tagKey" placeholder="enter tag">
              <q-autocomplete :static-data="{field: 'key', list: tags}" @selected="selected" />
            </q-search>
          </q-card-main>
          <q-card-separator />
          <q-card-title>Selected tag</q-card-title>
          <q-card-main>
            <q-chip v-for="item in interviewsetTags" :key="item.key" :color="item.key === 'common'? 'primary': 'warning'">{{item.label}}</q-chip>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-md-6">
        <q-card>
          <q-card-title>tag에 맞는 질문을 선택해주세요.</q-card-title>
          <q-card-separator />
          <q-card-main>
            <q-list>
              <q-item v-for="item in interviewsetTags">
                <q-item-main>{{ item.label }}</q-item-main>
                <q-item-side right>
                  <q-btn color="primary" big @click="$router.push('/interviewset/form-step2/' + item.key )">선택({{item.questions.length}})</q-btn>
                </q-item-side>
              </q-item>
            </q-list>
          </q-card-main>
          <q-card-separator />
          <q-card-main>
            <div class="row">
              <div class="col-12 text-right">
                <template v-if="totalQuestions >= 5">
                  <q-btn color="primary" big @click="createInterviewset(true)">인터뷰셋 생성</q-btn>
                </template>
                <template>
                  <q-btn color="primary" outline big @click="createInterviewset(true)">인터뷰셋 생성</q-btn>
                </template>
              </div>
            </div>
          </q-card-main>
        </q-card>
      </div>
    </div>
    <div class="row" style="margin-top: 30px;">
      <div class="col-md-6"></div>
    </div>
  </div>
</template>

<script>
import * as gType from '../../store/getter-types.js'
import * as mType from '../../store/mutation-types.js'
import { mapGetters } from 'vuex'
import { Dialog } from 'quasar'

export default {
  data () {
    return {
      name: '',
      doneCreateName: false,
      tagKey: '',
      tags: [
        {
          key: 'java', // The value given, when selected
          label: 'Java', // The value displayed as main label for this suggested selection
          sublabel: 'programming language', // optional
          icon: 'location_city', // optional
          stamp: 'popular'
        },
        {
          key: 'spring', // The value given, when selected
          label: 'Springframework', // The value displayed as main label for this suggested selection
          sublabel: 'DI framework', // optional
          icon: 'location_city', // optional
          stamp: 'popular'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      interviewsetName: gType.INTERVIEWSET_NAME,
      interviewsetTags: gType.INTERVIEWSET_TAGS,
      interviewsetList: gType.INTERVIEWSET_LIST
    }),
    hasInterviewsetName: function () {
      return this.interviewsetName !== ''
    },
    totalQuestions: function () {
      return this.interviewsetTags.map(x => x.questions.length).reduce((a, b) => a + b, 0)
    }
  },
  methods: {
    updateName: function () {
      this.$store.commit(mType.INTERVIEWSET_UPDATE_NAME, this.name)
    },
    selected: function (item) {
      if (this.interviewsetTags.filter(x => x.key === item.key).length > 0) {
        return
      }
      this.$store.commit(mType.INTERVIEWSET_ADD_TAG, item)
      this.tagKey = ''
    },
    createInterviewset: function (condition) {
      if (condition) {
        let interviewset = {}
        Object.assign(interviewset, {label: this.interviewsetName}, {tags: this.interviewsetTags})
        this.interviewsetList.push(interviewset)
        this.$router.push('/interviewset/list')
      }
      else {
        Dialog.create({
          title: 'Alert',
          message: '5개 이상의 인터뷰 질문을 추가해주세요.'
        })
      }
    }
  }
}
</script>
<style>
</style>
