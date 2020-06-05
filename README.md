<h1 align="center">Vue Social Sharing</h1>
<h4 align="center">A renderless components for sharing links on major social networks</h4>
<h5 align="center">Less than 2.5kb gzipped</h5>

<p align="center">
  <img width="580" src="https://user-images.githubusercontent.com/2951704/83863753-11f2af80-a724-11ea-9202-98b40cdbebe2.png">
</p>

<br>

<p align="center">
<a href="https://github.com/nicolasbeauvais/vue-social-sharing/releases"><img src="https://img.shields.io/github/release/nicolasbeauvais/vue-social-sharing.svg?style=flat-square" alt="Release"></a>
<a href="https://travis-ci.com/nicolasbeauvais/vue-social-sharing"><img src="https://img.shields.io/travis/com/nicolasbeauvais/vue-social-sharing/master.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/vue-social-sharing"><img src="https://img.shields.io/npm/dt/vue-social-sharing.svg?style=flat-square" alt="Downloads"></a>
<a href="https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nicolasbeauvais/vue-social-sharing.svg?style=flat-square" alt="License"></a>
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-1.x-brightgreen.svg?style=flat-square" alt="Vue 1"></a>
<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg?style=flat-square" alt="Vue 2"></a>
<a href="https://bundlephobia.com/result?p=vue-social-sharing"><img src="https://img.shields.io/bundlephobia/minzip/vue-social-sharing?color=green&label=gzip&style=flat-square" alt="gzip size"></a>
</p>

---

### [Demo](https://nicolasbeauvais.github.io/vue-social-sharing/)

### What is a renderless component?

Renderless components give you the highest possible control over your markup and styling. This means that `vue-social-sharing` ship with minimal HTML and no CSS to let you adapt the look and feel of the components to your needs. You can learn more about renderless components in [this blog article](https://adamwathan.me/renderless-components-in-vuejs/) by [@adamwathan](https://github.com/adamwathan).

### Understanding social sharing

Before using this package it is important to understand how Social Networks handle sharing links on their platform. When you share a link on a Social Network, the Social Network will crawl the link to detect [Open Graph meta tags](https://ogp.me/). If you share links that do not contain Open Graph meta tags, the Social Network will not be able to display a rich content for your link. You can refer to the [Available properties](https://github.com/nicolasbeauvais/vue-social-sharing#available-networks-and-properties) section of the documentation to check which Social Network accept which properties without Open Graph tags.  

## Installation

```bash
# Yarn
yarn add vue-social-sharing

# NPM
npm install --save vue-social-sharing
```

## Usage

### Loading the library

##### Browserify / Webpack

```javascript
import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing);
```

##### Nuxt
```javascript
// In your nuxt.config.js file:
modules: [
  'vue-social-sharing/nuxt'
]
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

## Available networks and properties

The `url` is the only property required for all networks.

###### General properties

Name           | Data Type  | Description
-------------- | ---------- | -----------
`tag`          | String     | HTML tag used to render the network component. Default to "a" tag.

###### Baidu

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Buffer

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Email

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared as the email subject.
`url`          | String     | Shared in the email content.
`description`  | String     | Shared in the email content after the url.

###### EverNote

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Facebook

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.
`quote`        | String     | A quote from the shared content.
`hashtags`     | String     | A list of comma-separated hashtags, only the first one will used by Facebook.

###### FlipBoard

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### HackerNews

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### InstaPaper

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.

###### Line

Name           | Data Type  | Default   | Description
-------------- | ---------- | --------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### LinkedIn

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.

###### Odnoklassniki

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Pinterest

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`media`        | String     | URL of an image describing the content.

###### Pocket

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Reddit

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Skype

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### SMS

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### StumbleUpon

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Telegram

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### Tumblr

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.

###### Twitter

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`hashtags`     | String     | A list of comma-separated hashtags.
`twitter-user` | String     | Twitter user to mention.

###### Viber

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### VK

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.
`media`        | String     | URL of an image describing the content.

###### Weibo

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`media`        | String     | URL of an image describing the content.

###### WhatsApp

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

###### Wordpress

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.
`description`  | String     | Description of the shared content.
`media`        | String     | URL of an image describing the content.

###### Xing

Name           | Data Type  | Description
-------------- | ---------- | -----------
`url`          | String     | URL of the shared content.
`title`        | String     | Title of the shared content.

###### Yammer

Name           | Data Type  | Description
-------------- | ---------- | -----------
`title`        | String     | Shared in the message content.
`url`          | String     | Shared in the message content after the title.
`description`  | String     | Shared in the message content after the url.

#### Available events

Events that are emitted on the vue $root instance:

Name                   | Data                       | Description
---------------------- | -------------------------- | --------------------------------------------------------------------------
`share_network_open`   | Network name, shared url   | Fired when a sharing popup is open
`share_network_change` | Network name, shared url   | Fired when the user open a new sharing popup while another is already open
`share_network_close`  | Network name, shared url   | Fired when a sharing popup is closed or changed by another popup

You can listen to a `vue-social-sharing` $root event by using the following code:
```javascript
Vue.$root.$on('share_network_open', function (network, url) {
  // your event code
});
```

Events that are emitted on the local `vue-social-sharing` instance:

Name                   | Data                       | Description
---------------------- | -------------------------- | --------------------------------------------------------------------------
`open`   | Network name, shared url | Fired when a sharing popup is open
`change` | Network name, shared url | Fired when the user open a new sharing popup while another is already open
`close`  | Network name, shared url | Fired when a sharing popup is closed or changed by another popup

You can listen to a `ShareNetwork` local event by using the following code:
```html
<ShareNetwork @open="open" @change="change" @close="close" />
```

> Note that the `share_network_close` event will not be fired for the WhatsApp, SMS and Email sharers.

## Extending the network list

In version `3.x` you can extend and override the list of available networks. You can see a working example of the feature in the `examples/index.js` file:

```javascript
import Vue from 'vue'
import VueSocialSharing from '@/vue-social-sharing'

Vue.use(VueSocialSharing, {
  networks: {
    fakeblock: 'https://fakeblock.com/share?url=@url&title=@title'
  }
})

new Vue({
  el: '#app',
})
```

## Extending the network list in Nuxt

You can extend the list of available networks directly in your `nuxt.config.js` file:
```javascript
modules: [
  ['vue-social-sharing/nuxt', {
    networks: {
      fakeblock: 'https://fakeblock.com/share?url=@url&title=@title'
    }
  }],
]
```

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
