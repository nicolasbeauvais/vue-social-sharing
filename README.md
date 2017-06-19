# vue-social-sharing

<img src="https://simpleicons.org/icons/facebook.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/googleplus.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/linkedin.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/pinterest.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/reddit.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/twitter.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/vk.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/sinaweibo.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/whatsapp.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/telegram.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/skype.svg" width="52" hspace="10"><img src="https://simpleicons.org/icons/line.svg" width="52" hspace="10">

---

[![Release](https://img.shields.io/github/release/nicolasbeauvais/vue-social-sharing.svg?style=flat-square)](https://github.com/nicolasbeauvais/vue-social-sharing/releases)
[![Build Status](https://img.shields.io/travis/nicolasbeauvais/vue-social-sharing.svg?style=flat-square)](https://travis-ci.org/nicolasbeauvais/vue-social-sharing)
[![Coverage Status](https://img.shields.io/coveralls/nicolasbeauvais/vue-social-sharing/master.svg?style=flat-square)](https://coveralls.io/github/nicolasbeauvais/vue-social-sharing?branch=master)
[![Downloads](https://img.shields.io/npm/dt/vue-social-sharing.svg?style=flat-square)](https://www.npmjs.com/package/vue-social-sharing)
[![License](https://img.shields.io/github/license/nicolasbeauvais/vue-social-sharing.svg?style=flat-square)](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/LICENSE)
[![vue1](https://img.shields.io/badge/vue-1.x-brightgreen.svg)](https://vuejs.org/)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue.js component for sharing links to social networks

##### For Vue.js prior to < V2 use vue-social-sharing v0.x
##### For SSR and Vue.js 2 support use vue-social-sharing v2.x

### [Demo](https://nicolasbeauvais.github.io/vue-social-sharing/)

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
var SocialSharing = require('vue-social-sharing');

Vue.use(SocialSharing);
```

##### HTML

```html
<script src="/dist/vue-social-sharing.min.js"></script>
```

### Using the social sharing component

```html
<social-sharing url="https://vuejs.org/" inline-template>
  <div>
      <network network="facebook">
        <i class="fa fa-facebook"></i> Facebook
      </network>
      <network network="googleplus">
        <i class="fa fa-google-plus"></i> Google +
      </network>
      <network network="linkedin">
        <i class="fa fa-linkedin"></i> LinkedIn
      </network>
      <network network="pinterest">
        <i class="fa fa-pinterest"></i> Pinterest
      </network>
      <network network="reddit">
        <i class="fa fa-reddit"></i> Reddit
      </network>
      <network network="twitter">
        <i class="fa fa-twitter"></i> Twitter
      </network>
      <network network="vk">
        <i class="fa fa-vk"></i> VKontakte
      </network>
      <network network="weibo">
        <i class="fa fa-weibo"></i> Weibo
      </network> 
      <network network="whatsapp">
        <i class="fa fa-whatsapp"></i> Whatsapp
      </network>
  </div>
</social-sharing>
```

#### Available properties

List of available props to use in the component:

Prop           | Data Type  | Default   | Description
-------------- | ---------- | --------- | -----------
`url`          | String     | current   | URL to share.
`title`        | String     |           | Sharing title (when available).
`description`  | String     |           | Sharing description (when available).
`quote`        | String     |           | Facebook quote (Facebook only).
`hashtags`     | String     |           | A list of comma-separated hashtags (Twitter only).
`twitter-user` | String     |           | Twitter user (Twitter only).
`media`        | String     |           | Url to a media (Pinterest only).

#### Available events

Events are emitted on the vue $root instance:

Name                   | Data                       | Description
---------------------- | -------------------------- | --------------------------------------------------------------------------
`social_shares_open`   | Network object, shared url | Fired when a sharing popup is open
`social_shares_change` | Network object, shared url | Fired when the user open a new sharing popup while another is already open
`social_shares_close`  | Network object, shared url | Fired when a sharing popup is closed or changed by another popup

You can listen to a `vue-social-sharing` event by using the following code:
```javascript
Vue.$root.$on('social_shares_open', function (network, url) {
  // your event code
});
```

> Note that the `social_shares_close` event is not fired for Whatsapp.

## Feature request
Feel free to open an issue to ask for a new social network support.

## Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CHANGELOG.md).

## Issues
Please make sure to read the [Issue Reporting Checklist](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Contribution
Please make sure to read the [Contributing Guide](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CONTRIBUTING.md) before making a pull request.

## License

[MIT](http://opensource.org/licenses/MIT)
