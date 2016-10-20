/*!
 * vue-social-sharing v0.0.0 
 * (c) 2016 nicolasbeauvais
 * Released under the MIT License.
 */
'use strict';

function plugin (Vue, options) {
  if ( options === void 0 ) options = {};

  Vue.prototype.$add = function (a, b) {
    return a + b;
  };
}

plugin.version = '0.0.0';

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;