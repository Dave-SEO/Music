import originJSOP from 'jsonp'
export default function jsonp (url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + prarims(data)
  return new Promise((resolve, reject) => {
    originJSOP(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function prarims (data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== 'undefined' ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
    // url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
