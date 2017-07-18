<template>
  <ul class="tab">
    <router-link to="/recommend" tag="li" class="tab-item">推荐</router-link>
    <router-link to="/singer" tag="li" class="tab-item">歌手</router-link>
    <router-link to="/search" tag="li" class="tab-item">排行</router-link>
    <router-link to="/rank" tag="li" class="tab-item">搜索</router-link>
  </ul>
</template>

<script>
  export default {
    components: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.6rem;
    height: 0.88rem;
    background: #7BC89F;
    .tab-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 0.3rem;
    }

    .router-link-active {
      color: #F3C961;
    }
  }
</style>
