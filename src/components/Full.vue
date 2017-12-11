<template>
  <q-layout ref="layout" view="lhh Lpr fff" :right-breakpoint="1100">
  <!-- <q-layout ref="layout" view="lHr LpR LFf" :right-breakpoint="1100"> -->
    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        LogInterview
        <span slot="subtitle">Employee</span>
      </q-toolbar-title>
      <!-- <q-btn flat @click="$refs.layout.toggleRight()">
        <q-icon name="menu" />
      </q-btn> -->
    </q-toolbar>
    <!-- Navigation -->
    <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="view_quilt" to="/dashboard" label="Dashboard" />
      <q-route-tab slot="title" icon="view_day" to="/question"label="인터뷰 질문 관리" />
      <q-route-tab slot="title" icon="view_day" to="/request"label="인터뷰 요청" />
      <q-route-tab slot="title" icon="view_day" to="/test-layout/tabs" label="InterviewStatus" />
      <q-route-tab slot="title" icon="view_day" to="/interviewset"label="InterviewSet" />
    </q-tabs>
    <!-- Left Side Panel -->
    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>계정관리</q-list-header>
        <q-side-link item to="/twitter">
          <q-item-side icon="rss feed" /> <q-item-main label="계정관리"/>
        </q-side-link>
        <q-side-link item to="/twitter">
          <q-item-side icon="rss feed" /> <q-item-main label="로그아웃"/>
        </q-side-link>
        <q-list-header>Q&A</q-list-header>
        <q-side-link item to="/twitter">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="1:1 게시판" sublabel="@quasarframework" />
        </q-side-link>
      </q-list>
    </div>
    <!-- Right Side Panel -->
    <!-- <div slot="right">
      Right Side of Layout
    </div> -->
    <router-view />
    <q-toolbar slot="footer">
      <q-toolbar-title>
        LogInterview
      </q-toolbar-title>
    </q-toolbar>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
