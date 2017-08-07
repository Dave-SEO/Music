<template>
    <div class="progress-circle">
      <svg class="circle" :width="radius" :height="radius" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
        <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
        <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
                :stroke-dashoffset="dashOffset"></circle>
      </svg>
      <slot></slot>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        dashArray: Math.PI * 2
      }
    },
    props: {
      radius: {
        type: Number,
        default: 0
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    computed: {
      dashOffset () {
        return (1 - this.percent) * this.dashArray
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .progress-circle{
    position: relative;
  }
  circle{
    stroke-width: 8px;
    transform-origin: center;
  }
  .progress-background{
    transform: scale(0.9);
    stroke: gold
  }
  .progress-bar{
    transform: scale(0.9) rotate(-90deg);
    stroke: gold
  }
</style>
