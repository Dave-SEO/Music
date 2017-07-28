<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="top">
          <div class="back" @click="back()">∨</div>
          <div class="title" v-html="currentSong.singer"></div>
          <div class="name" v-html="currentSong.name"></div>
        </div>
        <div class="middle">
          <img :src="currentSong.image" alt="">
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open"></div>
    </transition>
  </div>
</template>
<script>
  import {mapGetters, mapMutations} from 'vuex'
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
    }
  }
</style>
