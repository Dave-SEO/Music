<template>
  <div class="singer" ref="singer">
    <listview :singerList="singers" @select="select"></listview>
    <transition name="slider">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {singer} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import SingerClass from 'common/js/singerClass'
  import listview from '@/base/listView/listView'
  import {mapMutations} from 'vuex'
  const HOST_NAME = '热门'
  const HOST_SINGER_LENGTH = 10
  export default {
    data () {
      return {
        singers: []
      }
    },
    created () {
      this._getSingerList()
    },
    methods: {
      select (singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList () {
        singer().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._filterSinger(res.data.list)
          }
        })
      },
      _filterSinger (list) {
        let map = {
          hot: {
            title: HOST_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOST_SINGER_LENGTH) {
            map.hot.items.push(new SingerClass({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new SingerClass({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        // 对map排序 // 拆分ret hot
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOST_NAME) {
            hot.push(val)
          }
        }
        // 对 ret 排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        // 合并ret hot 数组
        let merge = hot.concat(ret)
        console.log('m', merge)
        return merge
      },
      // 把mutation的修改映射成一个方法名
      ...mapMutations({
        setSinger: 'SETSINGER'
      })
    },
    components: {
      listview
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 1.5rem;
    bottom: 0
    width: 100%

  .slider-enter-active, .slider-leave-active
    transition: all 0.3s

  .slider-enter, slider-leave-to
    transform: translate3d(100%, 0, 0)
</style>
