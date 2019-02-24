function debounce(fn, wait) { // TODO: to be verified
  var timeout = null
  return function() {
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, wait)
  }
}

module.exports = {
  debounce,
}
