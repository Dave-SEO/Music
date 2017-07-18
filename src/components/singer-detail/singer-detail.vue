<template>
  <div class="singer-detail">1</div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      // getters 最终映射到computed
      // 通过mapGetters 把mapGetters扩展到计算属性里面
      ...mapGetters([
        'singer' // 相当于在vue实例中挂载了一个singer的属性
      ])
    },
    created () {
      console.log(this.singer)
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
