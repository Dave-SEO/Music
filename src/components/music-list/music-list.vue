<template>
  <div class="listWrap">
    <div class="top" :style="{'background-image':`url(${bgImage})`}" ref="bgimg">
      <div class="filter" ref="filter"></div>
      <div class="player" ref="player">随机播放全部</div>
    </div>
    <div class="back" @click="back"> < </div>
    <div class="bglayer" ref="bglayer"></div>
    <scroll ref="list" @scroll="scroll" :data="songs" class="list" :probeType="probeType" :listenScroll="listenScroll">
      <song-list :songs="songs"></song-list>
    </scroll>
  </div>
</template>

<script>
  import songList from 'components/song-list/song-list'
  import scroll from '@/base/scrollView'
  export default {
    data () {
      return {
        scrollY: 0
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted () {
      this.bgheight = this.$refs.bgimg.clientHeight
      this.minHeight = -this.bgheight + 40
      this.$refs.list.$el.style.top = `${this.bgheight}px`
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
      scroll (pos) {
        this.scrollY = pos.y
      },
      back () {
        this.$router.back()
      }
    },
    components: {
      songList,
      scroll
    },
    watch: {
      scrollY (newY) {
        let translateY = Math.max(this.minHeight, newY)
        this.$refs.bglayer.style.transform = `translate3d(0,${translateY}px,0)`
        let zIndex = 0
        let blur = 0
        // 缩放
        let scale = 1
        const percent = Math.abs(newY / this.minHeight)
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 1
          console.log(1)
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.bgimg.style.transform = `scale(${scale})`
        this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`
        this.$refs.filter.style['webkitBackdrop-filter'] = `blur(${blur}px)`
        if (newY < this.minHeight) {
          zIndex = 1
          this.$refs.player.style.display = 'none'
          this.$refs.bgimg.style.paddingTop = 0
          this.$refs.bgimg.style.height = 40 + 'px'
        } else {
          this.$refs.player.style.display = 'block'
          this.$refs.bgimg.style.paddingTop = '70%'
          this.$refs.bgimg.style.height = 0
        }
        this.$refs.bgimg.style.zIndex = zIndex
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .bglayer {
    position: relative;
    height: 100%;
    background: #2f2f2f;
  }
.filter{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(7,17,27,0.4);
}
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
    background: #2f2f2f;
    .top {
      position: relative;
      padding-top: 70%;
      height: 0;
      background-size: cover;
      transform-origin: top;
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
      z-index: 2;
    }
  }
</style>
