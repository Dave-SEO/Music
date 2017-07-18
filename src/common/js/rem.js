/**
 * Created by zn on 2017/6/14.
 */
/* eslint-disable no-new */
(function (win, doc) {
 // 自定义相对设计稿文字大小100px,方便计算
  win.dSize = 100
  // 自定义设计稿宽度
  win.dWidth = 750
  // 最大设备宽度
  win.maxWidth = 414
  var docEl = doc.documentElement
  // 计算根文字大小,添加到html上,页面布局相采用rem单位
  var fontEl = document.createElement('style')
  var reFont = function () {
    var clientWidth = docEl.clientWidth > win.maxWidth ? win.maxWidth : docEl.clientWidth
    var scale = clientWidth / win.dWidth
    document.title = scale
    // scale = scale>0.6?0.6:scale
    var size = win.dSize * scale
    docEl.firstElementChild.appendChild(fontEl)
    fontEl.innerHTML = 'html{font-size:' + size + 'px!important;}body{width:' + win.dWidth / win.dSize + 'rem;margin-left:auto!important;margin-right:auto!important;}'
  }
  var rotateScreen = function () {
    setTimeout(function () {
      reFont()
    }, 300)
  }
  var loading = function () {
    reFont()
  }
  win.addEventListener('onorientationchange' in win ? 'orientationchange' : 'resize', rotateScreen, false)
  document.addEventListener('DOMContentLoaded', loading, false)
})(window, document)