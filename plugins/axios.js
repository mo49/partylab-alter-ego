export default function ({ $axios, app }) {
  $axios.onRequest(config => {
    // no cache for IE
    if (typeof config.params === 'undefined') {
      config.params = {};
    }
    if (typeof config.params === 'object') {
      if (typeof URLSearchParams === 'function' && config.params instanceof URLSearchParams)
        config.params.append('_', Date.now());
      else
        config.params._ = Date.now();
    }
  })
}
