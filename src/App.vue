<template>
  <div id="app">
    <vheader></vheader>
    <tab></tab>
    <player></player>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import player from 'components/player/player'
  import vheader from 'components/m-header/header'
  import tab from 'components/tab/tab'
  export default {
    components: {
      vheader,
      tab,
      player
    }
  }
</script>

<style>

</style>
