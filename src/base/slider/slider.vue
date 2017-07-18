<template>
  <div class="slider" ref="slider">
    <div  class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{'active': currentPageIndex === index}" v-for="(item,index) in dots"></span>
    </div>
  </div>
</template>

<script>
  import {addClass} from 'common/js/dom'
  import BSscroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted () {
//      this.$nextTick(() => {
//
//      })
      setTimeout(() => {
        this._setSliderWidth()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        } else {
          this._setSliderWidth(true)
          this.slider.refresh()
        }
      })
    },
    activated () {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated () {
      clearTimeout(this.timer)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth (isResize) {
        this.children = this.$refs.sliderGroup.children
        this.dots = this.children.length
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider () {
        this.slider = new BSscroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            this._play()
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      _play () {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .slider {
    min-height: 1px;
    position: relative;
    overflow: hidden;
  }
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }
  .dots {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  }
  .dots .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
    margin: 0 4px;
    opacity: 0.5;
    &.active {
      width: 20px;
      border-radius: 5px;
      background: #fff;
      opacity: 0.8;
    }
  }
  .a {
    color: red
  }
  .slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    a {
      display: block;
      width: 100%;
    }
    img {
      width: 100%;
      display: block;
    }
  }
</style>
