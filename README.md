# vue-social-sharing

[![Release](https://img.shields.io/github/release/nicolasbeauvais/vue-social-sharing.svg?style=flat-square)](https://github.com/nicolasbeauvais/vue-social-sharing/releases)
[![Build Status](https://img.shields.io/travis/nicolasbeauvais/vue-social-sharing.svg?style=flat-square)](https://travis-ci.org/nicolasbeauvais/vue-social-sharing)
[![Coverage Status](https://img.shields.io/coveralls/nicolasbeauvais/vue-social-sharing/master.svg?style=flat-square)](https://coveralls.io/github/nicolasbeauvais/vue-social-sharing?branch=master)
[![Downloads](https://img.shields.io/npm/dt/vue-social-sharing.svg?style=flat-square)](https://www.npmjs.com/package/vue-social-sharing)
[![License](https://img.shields.io/github/license/nicolasbeauvais/vue-social-sharing.svg?style=flat-square)](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/LICENSE)

A Vue.js component for sharing links to social networks

##### For Vue.js prior to < V2 use vue-social-sharing v0.x
##### For Vue.js V2 use vue-social-sharing v1.x

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

## Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CHANGELOG.md).

## Issues
Please make sure to read the [Issue Reporting Checklist](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Contribution
Please make sure to read the [Contributing Guide](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CONTRIBUTING.md) before making a pull request.

## License

[MIT](http://opensource.org/licenses/MIT)
