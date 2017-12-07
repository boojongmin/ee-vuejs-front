<template>
  <q-layout ref="layout" view="hHr LpR lFf" :right-breakpoint="1100">
    <!-- Header -->
    <q-toolbar slot="header">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        Layout Header
        <span slot="subtitle">Optional subtitle</span>
      </q-toolbar-title>
      <q-btn flat @click="$refs.layout.toggleRight()">
        <q-icon name="menu" />
      </q-btn>
    </q-toolbar>
    <!-- Navigation -->
    <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="view_quilt" to="/user/feed" hide="icon" label="About" />
      <q-route-tab slot="title" icon="view_day" to="/user/profile" extract hide="icon" label="Toolbar" />
      <q-route-tab slot="title" icon="view_day" to="/test-layout/tabs" replace label="Tabs" />
      <q-route-tab slot="title" icon="input" to="/test-layout/drawer" replace label="Drawer" />
    </q-tabs>
    <!-- Left Side Panel -->
    <div slot="left">
      <q-list no-border link inset-separator>
        <q-list-header>Essential Links</q-list-header>
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
        <q-side-link item to="/twitter">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-side-link>
      </q-list>
    </div>
    <!-- Right Side Panel -->
    <div slot="right">
      Right Side of Layout
    </div>
    <q-tree
      :model="treeModel"
      contract-html="<i class='material-icons'>remove_circle</i>"
      expand-html="<i class='material-icons'>add_circle</i>"
    ></q-tree>
    <q-scroll-observable @scroll="userHasScrolled" />
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    <router-view />
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
    asdf<br>
  </q-layout>
</template>
<script>
import {
  QLayout,
  QList,
  QListHeader,
  QSideLink,
  QItemSide,
  QItemMain,
  QTabs,
  QRouteTab,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QScrollObservable,
  QTree
} from 'quasar'
export default {
  components: {
    QLayout,
    QList,
    QListHeader,
    QSideLink,
    QItemSide,
    QItemMain,
    QTabs,
    QRouteTab,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QScrollObservable,
    QTree
  },
  methods: {
    userHasScrolled: function (e) {
      console.log(e)
    }
  },
  data () {
    return {
      treeModel: [
        {
          title: 'Item 1',
          expanded: true,
          children: [
            {
              title: 'Item 1.1',
              expanded: false,
              children: [
                {
                  title: 'Item 1.1.1',
                  expanded: false,
                  children: [
                    {
                      title: 'Item 1.1.1.1',
                      expanded: false,
                      children: []
                    }
                  ]
                },
                {
                  title: 'Item 1.1.2',
                  expanded: false,
                  handler () { console.log('Tapped on Item 1.1.2') },
                  children: []
                }
              ]
            },
            {
              title: 'Item 1.2',
              expanded: false,
              children: []
            }
          ]
        },
        {
          title: 'Item 2',
          expanded: false,
          children: []
        }
      ]
    }
  }
}
</script>

<style>
</style>