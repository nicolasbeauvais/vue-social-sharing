<h1 align="center">Vue Social Sharing</h1>
<h4 align="center">A renderless components for sharing links on major social networks</h4>
<p align="center">Less than 2.5kb gzipped</p>

<p align="center">
  <img width="580" src="https://user-images.githubusercontent.com/2951704/111610221-63fc5180-87db-11eb-8e66-22c1309a6a92.png">
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

## Vue 3 support

Vue 3 support is available in Alpha build, you can try it with the following command:

```bash
# Yarn
yarn add vue-social-sharing@next

# NPM
npm install --save vue-social-sharing@next
```

Remember that this is an alpha build, not all feature are available yet and you will certainly encounter some bugs. 


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

| Name           | Data Type | Description                                                        |
|----------------|-----------| -------------------------------------------------------------------|
| `tag`          | String    | HTML tag used to render the network component. Default to "a" tag. |
| `popup.width`  | Number    | Custom width of the popup window. Default to 626px.                |
| `popup.height` | Number    | Custom height of the popup window. Default to 426px.               |

###### Network properties

| Prop           | Type   | Description                                                |
|----------------|--------|------------------------------------------------------------|
| `url`          | String | URL to share.                                              |
| `title`        | String | Sharing title (if available).                              |
| `description`  | String | Sharing description (if available).                        |
| `quote`        | String | Facebook quote (Facebook only).                            |
| `hashtags`     | String | A list of comma-separated hashtags (Twitter and Facebook). |
| `twitter-user` | String | Twitter user (Twitter only).                               |
| `media`        | String | Url to a media (Pinterest, VK, Weibo, and Wordpress).      |

###### Networks

| Network       | `url`              | `title`            | `description`      | Extras/Comments                                                                                                 |
|---------------|--------------------|--------------------|--------------------|--------------------------------------------------------------------------------------------------------|
| Baidu         | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| Buffer        | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| Email         | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |
| EverNote      | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| Facebook      | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | `hashtags` A list of comma-separated hashtags, only the first one will be used.<br/>`quote` Facebook quote. |
| FlipBoard     | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| HackerNews    | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| InstaPaper    | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |
| Line          | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |
| LinkedIn      | :heavy_check_mark: | :x:                | :x:                |                                                                                                        |
| Messenger      | :heavy_check_mark: | :x:                | :x:                |                                                                                                        |
| Odnoklassniki | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| Pinterest     | :heavy_check_mark: | :heavy_check_mark: | :x:                | `media` URL of an image describing the content.                                                        |
| Pocket        | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| Reddit        | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| Skype         | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |
| SMS           | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |
| StumbleUpon   | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| Telegram      | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |
| Tumblr        | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |
| Twitter       | :heavy_check_mark: | :heavy_check_mark: | :x:                | `hashtags` A list of comma-separated hashtags.<br/>`twitter-user` Twitter user to mention.               |
| Viber         | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |
| VK            | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | `media` URL of an image describing the content.                                                        |
| Weibo         | :heavy_check_mark: | :heavy_check_mark: | :x:                | `media` URL of an image describing the content.                                                        |
| WhatsApp      | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |
| Wordpress     | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | `media` URL of an image describing the content.                                                        |
| Xing          | :heavy_check_mark: | :heavy_check_mark: | :x:                |                                                                                                        |
| Yammer        | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |                                                                                                        |

For the networks: `Line`, `Skype`, `SMS`, `Telegram`, `Viber`, `WhatsApp` and `Yammer`; the shared content is a string of the form: "`$title` `$url` `$description`"

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

## Customizing the popup window size

If needed, you can set a custom width and height for the popup window:
```html
<ShareNetwork :popup="{width: 400, height: 200}" />
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
