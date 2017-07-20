<template>
    <div class="song-list">
      <ul>
        <li v-for="item in songs">
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
<style scoped>
</style>
