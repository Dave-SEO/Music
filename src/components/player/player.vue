<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave = 'afterLeave'
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="top">
          <div class="back" @click="back()">∨</div>
          <div class="title" v-html="currentSong.singer"></div>
          <div class="name" v-html="currentSong.name"></div>
        </div>
        <div class="middle">
          <div class="box">
            <div class="cdWrapper" ref="cdWrapper">
              <div class="imgBox" >
                <img :src="currentSong.image" alt="" >
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="miniImg">
          <img :src="currentSong.image" class="img" alt="">
        </div>
        <div class="album">
          <p v-html="currentSong.singer"></p>
          <span v-html="currentSong.name"></span>
        </div>
        <div class="control ">
          <i class="music-icon icon-playlist"></i>
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
      leave (el, done) {
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      afterLeave () {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style.transform = ''
      },
      _getPosAndScale () {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = (window.innerHeight - paddingTop - width / 2 - paddingBottom)
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
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .box{
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
        }
        .cdWrapper{
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
        }
        .imgBox{
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 10px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          img{
            border-radius: 50%;
            width:100%;
          }
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
      .miniImg{
        padding: 0 10px 0 20px;
      }
      .img{
        width:40px;
        border-radius:50%;
      }
      .album{
        flex:1;
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
