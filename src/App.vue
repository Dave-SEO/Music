<template>
  <div id="app">
    <vheader></vheader>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vheader from 'components/m-header/header'
  import tab from 'components/tab/tab'
  export default {
    components: {
      vheader,
      tab
    }
  }
</script>

<style>

</style>
