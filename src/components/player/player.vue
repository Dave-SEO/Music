<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave='afterLeave'
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
              <div class="imgBox">
                <img :src="currentSong.image" alt="" :class="cdCls">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrap">
            <span class="startTime">{{formate(currentTime)}}</span>
            <progressBar :percent="percent" @percentChange="triggerPercent"></progressBar>
            <span class="endTime">{{formate(currentSong.duration)}}</span>
          </div>

          <div class="operators">
            <div class="icon i-left"><i class="icon-sequence"></i></div>
            <div class="icon i-left"><i class="icon-prev" @click="prevPlayer"></i></div>
            <div class="icon i-center" @click="togglePlay"><i :class="playIcon"></i></div>
            <div class="icon i-right"><i class="icon-next" @click="nextPlayer"></i></div>
            <div class="icon i-right"><i class="icon icon-not-favorite"></i></div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="miniImg imgBox">
          <img :src="currentSong.image" class="img" alt="" :class="cdCls">
        </div>
        <div class="album">
          <p v-html="currentSong.singer"></p>
          <span v-html="currentSong.name"></span>
        </div>
        <div class="control">
          <progressCircle :percent="percent" :radius="32">
            <i class="icon-mini icon-play-mini" :class="miniIcon" @click.stop="togglePlay"></i>
          </progressCircle>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import animations from 'create-keyframe-animation'
  import progressBar from '@/base/progress-bar/progress-bar'
  import progressCircle from '@/base/progress-circle/progress-circle'
  export default {
    data () {
      return {
        readySong: false,
        currentTime: 0
      }
    },
    mounted () {
      console.log('aaaaa', this.currentSong)
    },
    computed: {
      percent () {
        return this.currentTime / this.currentSong.duration
      },
      cdCls () {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon () {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
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
      updateTime (e) {
        this.currentTime = e.target.currentTime
      },
      formate (time) {
        time = time | 0
        let minute = time / 60 | 0
        let second = this._pad(time % 60)
        return `${minute}:${second}`
      },
      _pad (num, n = 2) {
        let len = num.toString().length
        while (len < 2) {
          num = '0' + num
          len++
        }
        return num
      },
      triggerPercent (percent) {
        this.$refs.audio.currentTime = this.currentSong.duration * percent
        if (!this.playing) {
          this.togglePlay()
        }
      },
      ready () {
        this.readySong = true
      },
      prevPlayer () {
        if (!this.readySong) {
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
        this.readySong = false
      },
      nextPlayer () {
        if (!this.readySong) {
          return
        }
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
        this.readySong = false
      },
      error () {},
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
      togglePlay () {
        this.setPlayingstate(!this.playing)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingstate: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })
    },
    watch: {
      currentSong () {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing (newPlay) {
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlay ? audio.play() : audio.pause()
        })
      }
    },
    components: {
      progressBar,
      progressCircle
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .control{
    width: 30px;
    flex: 0 0 30px;
  }
  .progress-wrap{
    padding:10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width:80%;
    margin:0 auto;
    text-align: center;
    span{
      color:#fff;
      flex: 0 0 30px;
    }
  }
  .player {
    .normal-player {
      position: fixed;
      width: 100%;
      top: 0;
      bottom: 0;
      background: #2f2f2f;
      z-index: 1;
      .top {
        margin-bottom: 25px;
        position: relative;
        .back {
          position: absolute;
          top: 0.2rem;
          left: 0.3rem;
          color: #FFCD32;
          font-size: 0.6rem;
        }
        .title {
          width: 70%;
          text-align: center;
          color: #fff;
          line-height: 40px;
          margin: 0 auto;
          font-size: 0.4rem;
        }
        .name {
          color: #fff;
          text-align: center;
        }
      }
      .middle {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .box {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          height: 0;
          padding-top: 80%;
        }
        .cdWrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
        }
        .imgBox {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 10px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }
      }
      &.normal-enter-active, &.normal-leave-active {
        transition: all 0.4s;
        .top {
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
      }
      &.normal-enter, &.normal-leave-to {
        opacity: 0;
        .top {
          transform: translate3d(0, -100px, 0);
        }
      }
      .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
        .operators {
          display: flex;
          align-items: center;
          .icon {
            flex: 1;
            color: #ffcd32;
            i {
              font-size: 30px;
            }
          }
          .i-left {
            text-align: right;
          }
          .i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 40px;
            }
          }
          .i-right {
            text-align: left;
          }
        }
      }
    }
    .imgBox img {
      border-radius: 50%;
      width: 100%;
      &.play {
        animation: rotate 10s linear infinite
      }
      &.pause {
        animation-play-state: paused
      }
    }
    .mini-player {
      position: fixed;
      width: 100%;
      left: 0;
      height: 60px;
      bottom: 0;
      z-index: 1;
      background: #333;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .miniImg {
        padding: 0 10px 0 20px;
      }
      .img {
        width: 40px;
        border-radius: 50%;
      }
      .album {
        flex: 1;
        margin-left: 10px;
        p {
          color: #fff;
        }
        span {
          color: #fff;
        }
      }
      .control {
        padding: 0 10px;
        i {
          font-size: 30px;
          color: orange;
        }
        .icon-mini{
          position: absolute;
          top:2px;
          left:1px;
          color: rgba(255,205,49,0.5);
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>
