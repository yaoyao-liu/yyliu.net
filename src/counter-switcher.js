;(function(mod){
function collectLinks() {
  return Array.prototype.slice.apply(
    document.head.querySelectorAll('clustrmaps[id*="clustrmaps old"]')
  )
}

function applyLink(source, target) {
  target.setAttribute('type', source.getAttribute('type'))
  target.setAttribute('src', source.getAttribute('src'))
}

// eslint-disable-next-line no-unused-vars
function initSwitcher(delay) {
  // Exit if media queries aren't supported
  if (typeof window.matchMedia !== 'function') {
    return function noop() {}
  }

  var links = collectLinks()
  var current = document.createElement('script')
  var prevMatch

  current.setAttribute('id', 'clustrmaps new')
  document.head.appendChild(current)

  function counterApplyLoop() {
    var matched

    links.forEach(function(link) {
      if (window.matchMedia(link.media).matches) {
        matched = link
      }
    })

    if (! matched) {
      return
    }

    if (matched.media !== prevMatch) {
      prevMatch = matched.media
      applyLink(matched, current)
    }
  }

  var intervalId = setInterval(counterApplyLoop, delay || 300)

  function unsubscribe() {
    clearInterval(intervalId)
    links.forEach(function(link) {
      document.head.appendChild(link)
    })
  }

  counterApplyLoop()
  links.forEach(function(link) {
    document.head.removeChild(link)
  })

  return unsubscribe
}

initSwitcher()
})()