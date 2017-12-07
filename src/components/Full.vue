<template>
  <q-layout ref="layout" view="lhh Lpr fff" :right-breakpoint="1100">
  <!-- <q-layout ref="layout" view="lHr LpR LFf" :right-breakpoint="1100"> -->
    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        EE Header
        <span slot="subtitle">Hellow world</span>
      </q-toolbar-title>
      <!-- <q-btn flat @click="$refs.layout.toggleRight()">
        <q-icon name="menu" />
      </q-btn> -->
    </q-toolbar>
    <!-- Navigation -->
    <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="view_quilt" to="/dashboard" label="Dashboard" />
      <q-route-tab slot="title" icon="view_day" to="/interviewset"label="InterviewSet" />
      <q-route-tab slot="title" icon="view_day" to="/test-layout/tabs" label="InterviewStatus" />
    </q-tabs>
    <!-- Left Side Panel -->
    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>Some menu</q-list-header>
        <q-side-link item to="/docs">
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-side-link>
        <q-side-link item to="/forum">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-side-link>
        <q-side-link item to="/chat">
          <q-item-side icon="chat" />
          <q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
        </q-side-link>
        <q-list-header>User Manage</q-list-header>
        <q-side-link item to="/twitter">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
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
        EE Footer
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
