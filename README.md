<h1 align="center">Vue Social Sharing</h1>


<p align="center">
  <img width="800" src="https://user-images.githubusercontent.com/2951704/53009272-701a5700-343b-11e9-83e5-b05f81fe59d7.png">
</p>

<p align="center">
<a href="https://github.com/nicolasbeauvais/vue-social-sharing/releases"><img src="https://img.shields.io/github/release/nicolasbeauvais/vue-social-sharing.svg?style=flat-square" alt="Release"></a>
<a href="https://travis-ci.org/nicolasbeauvais/vue-social-sharing"><img src="https://img.shields.io/travis/nicolasbeauvais/vue-social-sharing/master.svg?style=flat-square" alt="Build Status"></a>
<a href="https://coveralls.io/github/nicolasbeauvais/vue-social-sharing?branch=master"><img src="https://img.shields.io/coveralls/nicolasbeauvais/vue-social-sharing/master.svg?style=flat-square" alt="Coverage Status"></a>
<a href="https://www.npmjs.com/package/vue-social-sharing"><img src="https://img.shields.io/npm/dt/vue-social-sharing.svg?style=flat-square" alt="Downloads"></a>
<a href="https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nicolasbeauvais/vue-social-sharing.svg?style=flat-square" alt="License"></a>
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-1.x-brightgreen.svg" alt="Vue 1"></a>
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg" alt="Vue 2"></a>
</p>

<h3 align="center">Vue.js renderless components for sharing links on major social networks</h3>
<h4 align="center">Less than 2.5kb gzipped</h4>

---

##### For Vue.js prior to v2.x use vue-social-sharing v0.x
##### For Vue.js v2.x support use vue-social-sharing v2.x
##### For SSR and Vue.js v3.x support use vue-social-sharing v3.x

### [Demo](https://nicolasbeauvais.github.io/vue-social-sharing/)

### What is a renderless component?

Renderless components give you the highest possible control over your markup and styling. This means that `vue-social-sharing` ship with minimal HTML and no CSS to let you adapt the look and feel of the components to your needs. You can learn more about renderless components in [this blog article](https://adamwathan.me/renderless-components-in-vuejs/) by [@adamwathan](https://github.com/adamwathan).

### Understanding social sharing

Before using this package it is important to understand how Social Network handle sharing links on their platform. When you share a link on a Social Network, the Social Network will crawl the link to detect [Open Graph meta tags](https://ogp.me/). If you share links that do not contain Open Graph meta tags, the Social Network will not be able to display a rich content for your link. You can refer to the [Available properties](https://github.com/nicolasbeauvais/vue-social-sharing#available-properties) section of the documentation to check which Social Network accept properties without Open Graph tags.  

## Installation

```bash
# Yarn
yarn add vue-social-sharing

# NPM
npm install --save vue-social-sharing

# Bower
bower install vue-social-sharing
```

## Usage

### Loading the library

##### Browserify / Webpack

```javascript
import VueSocialSharing from 'vue-social-sharing'

Vue.use(SocialSharing);
```

##### HTML

```html
<script src="/dist/vue-social-sharing.js"></script>
```

### Using the Share Network component

```html
<ShareNetwork
    network="facebook"
    url="https://news.vuejs.org/issues/180"
    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
    quote="The hot reload is so fast it\'s near instant. - Evan You"
    hashtags="vuejs,vite"
  >
    Share on Facebook
</ShareNetwork>
```

#### Available Networks

- Facebook
- Line
- LinkedIn
- Odnoklassniki
- Pinterest
- Reddit
- Skype
- Telegram
- Twitter
- Viber
- Vk
- Weibo
- Whatsapp
- Custom

#### Available properties

List of available props to use in the component:

Prop           | Data Type  | Default   | Description
-------------- | ---------- | --------- | -----------
`url`          | String     | current   | URL to share.
`title`        | String     |           | Sharing title (when available).
`description`  | String     |           | Sharing description (when available).
`quote`        | String     |           | Facebook quote (Facebook only).
`hashtags`     | String     |           | A list of comma-separated hashtags (Twitter and Facebook).
`twitter-user` | String     |           | Twitter user (Twitter only).
`media`        | String     |           | Url to a media (Pinterest only).
`tag`   | String     | "a"    | Tag the network component should render.

<aside class="notice">
  Facebook only accept one hashtag. If you define multiple hashtags, only the first one will be passed to facebook
</aside>


#### Available events

Events that are emitted on the vue $root instance:

Name                   | Data                       | Description
---------------------- | -------------------------- | --------------------------------------------------------------------------
`share_network_open`   | Network object, shared url | Fired when a sharing popup is open
`share_network_change` | Network object, shared url | Fired when the user open a new sharing popup while another is already open
`share_network_close`  | Network object, shared url | Fired when a sharing popup is closed or changed by another popup

You can listen to a `vue-social-sharing` $root event by using the following code:
```javascript
Vue.$root.$on('share_network_open', function (network, url) {
  // your event code
});
```

Events that are emitted on the local `vue-social-sharing` instance:

Name                   | Data                       | Description
---------------------- | -------------------------- | --------------------------------------------------------------------------
`open`   | Network object, shared url | Fired when a sharing popup is open
`change` | Network object, shared url | Fired when the user open a new sharing popup while another is already open
`close`  | Network object, shared url | Fired when a sharing popup is closed or changed by another popup

You can listen to a `ShareNetwork` local event by using the following code:
```html
<ShareNetwork @open="open()" @change="change()" @close="close()" />
```

> Note that the `share_network_close` event will not be fired for the WhatsApp, SMS and Email sharers.

## Extending the network list

In version `3.x` you can extend and override the list of available networks. You can see a working example of the feature in the `examples/index.js` file:

```javascript
import Vue from 'vue'
import VueSocialSharing from '@/vue-social-sharing'

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
})
```

You can choose between two behavior type while defining a custom network:

Type                   | Effect                    
---------------------- | --------------------------
`popup`   | Open the sharing link in a new popup
`direct` | Open the sharing link directly (suitable for mobile apps sharing, emails, sms, ...)

## Feature request
Feel free to open an issue to ask for a new social network support.

## Changelog
Detailed changes for each release can be found in [CHANGELOG.md](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CHANGELOG.md).

## Issues
Please make sure to read the [Issue Reporting Checklist](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Contribution
Please make sure to read the [Contributing Guide](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CONTRIBUTING.md) before making a pull request.

## License

[MIT](http://opensource.org/licenses/MIT)
