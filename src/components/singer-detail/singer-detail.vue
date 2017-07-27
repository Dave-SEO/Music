<template>
  <music-list :title="title" :songs="singerList" :bg-image="bgImage"></music-list>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { singerDetail } from '@/api/singer'
  import { createSong } from 'common/js/song'
  import musicList from 'components/music-list/music-list'
  export default {
    data () {
      return {
        singerList: []
      }
    },
    computed: {
      title () {
        return this.singer.name
      },
      bgImage () {
        return this.singer.avator
      },
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
    },
    components: {
      musicList
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
