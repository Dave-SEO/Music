/**
 * Created by zn on 2017/6/18.
 */
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  } else {
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + ('\\s | $'))
  return reg.test(el.className)
}

export function getData (el, name, val) {
  let names = 'data-' + name
  if (!val) {
    return el.getAttribute(names)
  } else {
    return el.setAttribute(names, val)
  }
}
