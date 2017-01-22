# vue-social-sharing

[![Release](https://img.shields.io/github/release/nicolasbeauvais/vue-social-sharing.svg?style=flat-square)](https://github.com/nicolasbeauvais/vue-social-sharing/releases)
[![Build Status](https://img.shields.io/travis/nicolasbeauvais/vue-social-sharing.svg?style=flat-square)](https://travis-ci.org/nicolasbeauvais/vue-social-sharing)
[![Coverage Status](https://img.shields.io/coveralls/nicolasbeauvais/vue-social-sharing/master.svg?style=flat-square)](https://coveralls.io/github/nicolasbeauvais/vue-social-sharing?branch=master)
[![Downloads](https://img.shields.io/npm/dt/vue-social-sharing.svg?style=flat-square)](https://www.npmjs.com/package/vue-social-sharing)
[![License](https://img.shields.io/github/license/nicolasbeauvais/vue-social-sharing.svg?style=flat-square)](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/LICENSE)
[![vue1](https://img.shields.io/badge/vue-1.x-brightgreen.svg)](https://vuejs.org/)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue.js component for sharing links to social networks

##### For Vue.js prior to < V2 use vue-social-sharing v0.x
##### For Vue.js V2 use vue-social-sharing v1.x

##[Demo](https://nicolasbeauvais.github.io/vue-social-sharing/)

## Include support for:
<img src="http://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-facebook-1.png&amp;r=59&amp;g=89&amp;b=152" width="64">
&nbsp;&nbsp;
<img src="http://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-twitter-1.png&amp;r=85&amp;g=172&amp;b=238" width="64">
&nbsp;&nbsp;
<img src="http://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-google-plus-1.png&amp;r=211&amp;g=72&amp;b=54" width="64">
&nbsp;&nbsp;
<img src="http://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-pinterest-1.png&amp;r=203&amp;g=32&amp;b=38" width="64">
&nbsp;&nbsp;
<img src="http://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2016/png/iconmonstr-reddit-1.png&amp;r=255&amp;g=92&amp;b=6" width="64">
&nbsp;&nbsp;
<img src="http://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-linkedin-1.png&amp;r=0&amp;g=119&amp;b=181" width="64">
&nbsp;&nbsp;
<img src="http://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2016/png/iconmonstr-whatsapp-1.png&amp;r=37&amp;g=211&amp;b=102" width="64">

---

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
      <facebook>
        <i class="fa fa-facebook"></i> Facebook
      </facebook>

      <twitter>
        <i class="fa fa-twitter"></i> Twitter
      </twitter>

      <googleplus>
        <i class="fa fa-google-plus"></i> Google +
      </googleplus>

      <pinterest>
        <i class="fa fa-pinterest"></i> Pinterest
      </pinterest>

      <reddit>
        <i class="fa fa-reddit"></i> Reddit
      </reddit>

      <linkedin>
        <i class="fa fa-linkedin"></i> LinkedIn
      </linkedin>

      <whatsapp>
        <i class="fa fa-whatsapp"></i> Whatsapp
      </whatsapp>
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
