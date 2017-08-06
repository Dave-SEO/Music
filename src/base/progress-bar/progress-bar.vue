<template>
  <div class="progress-bar" ref="progressBar">
    <div class="inner" ref="inner">
      <div class="progress" ref="progress">
        <div class="btn-wrap" ref="btnWrap" @touchstart.prevent="progressStart" @touchmove.prevent="progressMove"
             @touchend="progressEnd"
        >
          <div class="btn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const progressBtnWidth = 18
  export default {
    created () {
      this.touch = {}
    },
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    methods: {
      progressStart (e) {
        this.touch.initPlay = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressMove (e) {
        if (!this.touch.initPlay) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, deltaX + this.touch.left))
        this._offset(offsetWidth)
      },
      progressEnd () {
        this.touch.initPlay = false
        this._triggerPercent()
      },
      _triggerPercent () {
        const offsetWidth = this.$refs.inner.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / offsetWidth
        this.$emit('percentChange', percent)
      },
      _offset (offsetWidth) {
        this.$refs.progress.style.width = offsetWidth + 'px'
        this.$refs.btnWrap.style.transform = `translate3d(${offsetWidth}px,0,0)`
      }
    },
    watch: {
      percent (newpercent) {
        if (newpercent >= 0 && !this.touch.initPlay) {
          const offsetWidth = newpercent * (this.$refs.inner.clientWidth - progressBtnWidth)
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .progress-bar {
    flex: 1;
    .inner {
      position: relative;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 4px;
        background: gold;
        .btn-wrap {
          position: absolute;
          top: -13px;
          left: -8px;
          width: 30px;
          height: 30px;
          .btn {
            position: relative;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 3px solid #fff;
            background: gold;
            box-sizing: border-box;
            top: 7px;
            left: 7px;
          }
        }
      }
    }
  }
</style>
