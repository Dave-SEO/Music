<template>
  <div class="player">
    <div class="normal-player">
      <div class="top">
        <div class="back">∨</div>
        <div class="title">wangsulun</div>
        <div class="name">zhoujielun</div>
      </div>
      <div class="middle">

      </div>
    </div>
    <div class="mini-player"></div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .player{
    position: absolute;
    width: 100%;
    top:0;
    bottom: 0;
    background: #2f2f2f;
    z-index: 1;
    .normal-player{
      position: relative;
      .top{
        .back{
          position: absolute;
          top: 0.2rem;
          left: 0.3rem;
          color:#FFCD32;
          font-size:0.6rem;
        }
        .title{
          width:70%;
          text-align: center;
          color:#fff;
          line-height:40px;
          margin:0 auto;
          font-size: 0.4rem;
        }
        .name{
          color:#fff;
          text-align: center;
        }
      }
      .middle{
        width: 100%;
        position: fixed;
        top: 1.3rem;
        bottom: 6rem;
      }
    }
    .mini-player{
      position: fixed;
      width:100%;
      left:0;
      height:60px;
      bottom: 0;
      background: #333;
    }
  }
</style>
