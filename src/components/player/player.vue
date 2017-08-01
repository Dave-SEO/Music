<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="top">
          <div class="back" @click="back()">∨</div>
          <div class="title" v-html="currentSong.singer"></div>
          <div class="name" v-html="currentSong.name"></div>
        </div>
        <div class="middle">
          <img :src="currentSong.image" alt="" ref="cdWrapper">
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <img :src="currentSong.image" class="img" alt="">
        <div class="album">
          <p v-html="currentSong.singer"></p>
          <span v-html="currentSong.name"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
  import animations from 'create-keyframe-animation'
  export default {
    mounted () {
      console.log(this.currentSong)
    },
    computed: {
      ...mapGetters([
        'currentIndex',
        'fullScreen',
        'playing',
        'playlist',
        'currentSong'
      ])
    },
    methods: {
      back () {
        this.setFullScreen(false)
      },
      enter (el, done) {
        const {x, y, scale} = this._getPosAndScale()
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter () {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      _getPosAndScale () {
        const targetWidth = 40
        const paddingLeft = 18
        const paddingBottom = 20
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - window.innerHeight / 2 - paddingBottom
        return {x, y, scale}
      },
      open () {
        this.setFullScreen(true)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      })
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .player{
    .normal-player{
      position:fixed;
      width: 100%;
      top:0;
      bottom: 0;
      background: #2f2f2f;
      z-index: 1;
      .top{
        margin-bottom:25px;
        position: relative;
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
        top: 1.9rem;
        bottom: 6rem;
        img{
          width:80%;
          margin:0 auto;
          border-radius: 50%;
          display: block;
          border:10px solid rgba(255,255,255,0.1);
        }
      }
      &.normal-enter-active,&.normal-leave-active{
        transition:all 0.4s;
        .top{
          transition:all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }
      &.normal-enter,&.normal-leave-to{
        opacity: 0;
        .top{
          transform:translate3d(0,-100px,0);
        }
      }
    }
    .mini-player{
      position: fixed;
      width:100%;
      left:0;
      height:60px;
      bottom: 0;
      z-index:1;
      background: #333;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left:18px;
      .img{
        width:40px;
        border-radius:50%;
      }
      .album{
        margin-left:10px;
        p{
          color:#fff;
        }
        span{
          color:#fff;
        }
      }
    }
  }
</style>
