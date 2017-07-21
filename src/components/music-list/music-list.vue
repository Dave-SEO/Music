<template>
  <div class="listWrap">
    <div class="top" :style="{'background-image':`url(${bgImage})`}" ref="bgimg">
      <div class="player">随机播放全部</div>
    </div>
    <div class="back" @click="back"> < </div>

    <scroll ref="list" :data="songs" class="list">
      <song-list :songs="songs"></song-list>
    </scroll>

  </div>
</template>

<script>
  import songList from 'components/song-list/song-list'
  import scroll from '@/base/scrollView'
  export default {
    mounted () {
      this.$refs.list.$el.style.top = `${this.$refs.bgimg.clientHeight}px`
      console.log('a', this.$refs.list.$el)
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    },
    components: {
      songList,
      scroll
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .list {
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #2f2f2f;
  }

  .listWrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    .top {
      position: relative;
      padding-top: 70%;
      height: 0;
      background-size: cover;
      .player {
        text-align: center;
        position: absolute;
        bottom: 0.5rem;
        color: #ffcd32;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 2.7rem;
        padding: 0.14rem 0;
        border: 1px solid #ffcd32;
        border-radius: 2rem;
      }
    }
    .back {
      position: absolute;
      top: 0.2rem;
      left: 0.3rem;
      font-size: 0.7rem;
      color: #ffcd32;
      font-weight: bolder;
    }
  }
</style>
