## Creating a Share Network link with dynamic data

To use a custom network you need to define it in the initialisation option of the `VueSocialSharing` plugin.

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
import { ShareNetwork, useNetworks } from 'vue-social-sharing'
export default {
 components: { ShareNetwork },
 setup () {
  const { setNetwork } = useNetworks()

  setNetwork('fakeblock', 'https://fakeblock.com/share?url=@url&title=@title')
 }
}
</script>
```

[Vue Social Sharing on GitHub](https://github.com/nicolasbeauvais/vue-social-sharing)
