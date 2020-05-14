/*
Nuxt.js module for vue-social-sharing
Usage:
    - Install vue-social-sharing package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'vue-social-sharing/nuxt'
            // Optionally passing options in module configuration
            ['vue-social-sharing/nuxt', { ...options }]
        ],
        // Optionally passing options in module top level configuration
        VueSocialSharing: { ...options }
    }
*/

const { resolve } = require('path')

module.exports = function nuxtVueWaitModule (moduleOptions) {
  const options = Object.assign({}, this.options.Index, moduleOptions)

  // Register plugin
  this.addPlugin({
    src: resolve(__dirname, 'vue-social-sharing-plugin.template.js.tpl'),
    fileName: 'vue-social-sharing-plugin.js',
    options: options
  })
}

// required by nuxt
module.exports.meta = require('../package.json')
