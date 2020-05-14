import Vue from 'vue'
import VueSocialSharing from '@/vue-social-sharing'

import App from './App.vue'

Vue.use(VueSocialSharing, {
  networks: {
    fakeblock: {
      sharer: 'https://fakeblock.com/share?url=@url&title=@title',
      type: 'popup'
    }
  }
})

new Vue({
  el: '#app',
  render: createElement => createElement(App)
})
