## Creating a Share Network link with static data

```html
<template>
  <ShareNetwork
      network="twitter"
      url="https://news.vuejs.org/issues/180"
      title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
      description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
      quote="The hot reload is so fast it\'s near instant. - Evan You"
      hashtags="vuejs,vite,javascript"
      twitterUser="youyuxi"
    >
    <i class="fab fah fa-lg fa-twitter"></i>
    <span>Share on Twitter</span>
  </ShareNetwork>
</template>

<script>
export default {
  // Nothing needed here
}
</script>
```

[Vue Social Sharing on GitHub](https://github.com/nicolasbeauvais/vue-social-sharing)
