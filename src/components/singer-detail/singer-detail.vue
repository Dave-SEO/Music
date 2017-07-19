<template>
  <div class="singer-detail">1</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {singerDetail} from '@/api/singer'
  import {createSong} from 'common/js/song'
  export default {
    data () {
      return {
        singerList: []
      }
    },
    computed: {
      // getters 最终映射到computed
      // 通过mapGetters 把mapGetters扩展到计算属性里面
      ...mapGetters([
        'singer' // 相当于在vue实例中挂载了一个singer的属性
      ])
    },
    methods: {
      _singerDetail () {
        singerDetail(this.singer.id).then(res => {
          if (res.code === 0) {
            this.singerList = this._normalizeSinger(res.data.list)
            console.log('///////', this.singerList)
          }
        })
      },
      _normalizeSinger (list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    created () {
      this._singerDetail()
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .singer-detail {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
</style>
