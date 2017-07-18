<template>
  <scroll class="recommend" :data='music' ref="loads">
    <div class="recommend-content">
      <div class="slider-wrapper" v-if="recommend.length">
        <sliders>
          <div v-for="item in recommend">
            <a href="javascript:;" :href="item.linkUrl">
              <img :src="item.picUrl" @load="ImageLoad" class="needsclick">
            </a>
          </div>
        </sliders>
      </div>
      <div class="music-list">
        <div class="title">热门歌曲推荐</div>
        <ul class="music">
          <li v-for="item in music">
            <img v-lazy="item.imgurl" alt="" width="60" height="60">
            <div>
              <span v-html="item.creator.name"></span>
              <p v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </scroll>
</template>

<script>
  import sliders from '@/base/slider/slider'
  import scroll from '@/base/scrollView'
  import {getRecommend, getMusicList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  export default {
    data () {
      return {
        recommend: [],
        music: []
      }
    },
    created () {
      this._getRecommend()
      this._getMusicList()
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommend = res.data.slider
          }
        })
      },
      _getMusicList () {
        getMusicList().then((res) => {
          this.music = res.data.list
          console.log(this.music)
        })
      },
      ImageLoad () {
        if (!this.checked) {
          this.$refs.loads.refresh()
          this.checked = true
        }
      }
    },
    components: {
      sliders,
      scroll
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .recommend {
    position: fixed;
    width: 100%;
    top: 1.5rem;
    bottom: 0;
    overflow: hidden;
    .recommend-content {
      .slider-wrapper {
      }
    }
  }

  .music li {
    display: flex;
    justify-content: flex-start;
    padding: 10px 0;
    padding-left: 15px;
    border-bottom: 1px solid #e2e2e2;
    box-sizing: border-box;
  }

  .music li div {
    margin-left: 10px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    p {
      margin-top: 10px;
    }
  }

  .title {
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    background: #f4f4f4;
  }
</style>
