<template>
  <div class="song-list">
    <ul class="songWrap">
      <li @click="select(item, index)" v-for="(item, index) in songs">
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <span class="desc">{{getDesc(item)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    methods: {
      getDesc (song) {
        return `${song.singer} ·${song.album}`
      },
      select (item, index) {
        this.$emit('select', item, index)
        console.log(index)
      }
    },
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    mounted () {
      console.log(',', this.songs)
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .songWrap{
    padding-bottom: 0.2rem;
  li{
    padding:0.5rem 0.2rem 0rem 0.5rem;
  .content{
    color:#fff;
  .name{
    margin-bottom:0.1rem;
  }
  }
  .desc{
    color:#ccc;
  }
  }
  }
</style>
