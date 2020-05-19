## Creating a Share Network link with dynamic data

To use a custom network you need to define it in the initialisation option of the `VueSocialSharing` plugin.

```javascript
import Vue from 'vue'
import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing, {
  networks: {
    fakeblock: 'https://fakeblock.com/share?url=@url&title=@title',
  }
})

new Vue({
  el: '#app',
})
```

You can then use your custom network like any other one:

```html
<template>
  <ShareNetwork
    network="fakeblock"
    url="https://news.vuejs.org/issues/180"
    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
  >
    <i class="fab fah fa-lg fa-react"></i>
    <span>Custom Network</span>
  </ShareNetwork>
</template>

<script>
export default {
 // Nothing needed here
}
</script>
```

[Vue Social Sharing on GitHub](https://github.com/nicolasbeauvais/vue-social-sharing)
