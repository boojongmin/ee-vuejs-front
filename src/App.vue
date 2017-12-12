<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
     <router-view />
  </div>
</template>

<script>
/*
 * Root component
 */
import * as gType from './store/getter-types.js'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted: function () {
  },
  computed: {
    ...mapGetters({
      isAuth: [gType.AUTH_IS_AUTHENTICATED]
    })
  }
}
</script>

<style></style>
