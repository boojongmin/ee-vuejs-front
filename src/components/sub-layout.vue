<template>
  <div>
    <ul class="breadcrumb">
      <li v-for="item in items" :key="item.path">
        <router-link :to="{path: item.path === '' ? '/' : item.path}">
          {{item.name}}
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return { }
  },
  mounted: function () {
  },
  computed: {
    items: function () {
      return this.$route.matched
    }
  }
}
</script>

<style>
</style>
