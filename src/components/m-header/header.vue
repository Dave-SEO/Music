<template>
    <div class="header">
        <span class="title">MY·MUSIC</span>
        <span class="user">1</span>
    </div>
</template>

<script>
    export default {}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .header{
    display: flex;
    height:0.6rem;
    position: relative;
    justify-content: center;
    align-items: center;
    background:#71B991;
    border-bottom:1px solid #619F7C;
    .title{
      color:#F3C961;
    }
    .user{
      position: absolute;
      right:0.2rem;
    }
  }
</style>
