<template>
  <iscroll :data="singerList" class="listView" ref="listView" @scroll="scroll"
           :listen-scroll="listenScroll" :probeType="probeType">
    <ul class="singerWrap">
      <li v-for="group in singerList" class="list" ref="listGroup">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group" @click="selectItem(item)">
            <div class="img-box"><img :src="item.avator" alt="" width="50" height="50"></div>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <ul class="singer-index" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="move">
      <li v-for="(item, index) in shortcutList" :data-index="index" :class="{'active': index === count}">{{item}}</li>
    </ul>

    <div class="listfied" v-show="fixedTitle" ref="fixed">
      <span>{{fixedTitle}}</span>
    </div>
  </iscroll>
</template>

<script type="text/ecmascript-6">
  import iscroll from '@/base/scrollView'
  import {getData} from 'common/js/dom'
  export default {
    data () {
      return {
        count: 0,
        scrollY: -1,
        diff: -1
      }
    },
    created () {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
      this.listHight = []
    },
    props: {
      singerList: {
        type: Array,
        default: []
      }
    },
    mounted () {
      this.$nextTick(() => {
      })
    },
    computed: {
      shortcutList () {
        return this.singerList.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        return this.singerList[this.count] ? this.singerList[this.count].title : ''
      }
    },
    methods: {
      onShortcutTouchStart (e) {
        let index = getData(e.target, 'index')
        let frishTouch = e.touches[0].pageY
        this.touch.y1 = frishTouch
        this.touch.index = index
        this._scrollTo(index)
      },
      selectItem (item) {
        this.$emit('select', item)
      },
      move (e) {
        let moveTouch = e.touches[0].pageY
        this.touch.y2 = moveTouch
        let data = (this.touch.y2 - this.touch.y1) / 18 | 0// 滚动了几个元素
        let nowIndex = Number(this.touch.index) + data
        console.log('nowIndex', typeof nowIndex)
        this._scrollTo(nowIndex)
      },
      _scrollTo (index) {
        if (!index || index === 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHight.length - 2) {
          index = this.listHight.length - 2
        }
        this.scrollY = -this.listHight[index]
        this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      _listHight () {
        this.listHight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHight.push(height)
        }
      }
    },
    watch: {
      singerList () {
        setTimeout(() => {
          this._listHight()
        }, 20)
      },
      scrollY (newY) {
        const listHeight = this.listHight
        if (newY > 0) {
          this.count = 0
          return
        }
        // 中间
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.count = i
            this.diff = height2 + newY
            return
          }
        }
        // 滚动到底部 且-newY大于第一个元素的上限
        this.count = listHeight - 2   // 减一是最后一个，但是区间多个0，所以要减去2 才是最后一个
      },
      diff (newY) {
        let fixedTop = (newY > 0 && newY < 22.17) ? newY - 22.17 : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }
    },
    components: {
      iscroll
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .listfied {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 0.52rem;
    line-height: 0.52rem;
    padding-left: 10px;
    background: #e2e2e2;
  }

  .listView {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #ffffff;
    .singerWrap {
      .list {
        .title {
          height: 0.52rem;
          line-height: 0.52rem;
          padding-left: 10px;
          background: #e2e2e2;
        }
        .list-group {
          padding: 10px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .img-box {
            margin-right: 10px;
          }
          img {
            border-radius: 50%;
          }
        }
      }
    }
    .singer-index {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 10px 0;
      border-radius: 10px;
      text-align: center;
      background: rgba(0, 0, 0, 0.3);
      font-family: Helvetica;
      .active {
        color: yellow;
      }
      li {
        padding: 3px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
</style>
