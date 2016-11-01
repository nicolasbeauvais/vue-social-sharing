# vue-social-sharing

[![npm version](https://badge.fury.io/js/vue-social-sharing.svg)](https://badge.fury.io/js/vue-social-sharing)
[![Bower version](https://badge.fury.io/bo/vue-social-sharing.svg)](https://badge.fury.io/bo/vue-social-sharing)
[![Build Status](https://travis-ci.org/nicolasbeauvais/vue-social-sharing.svg?branch=master)](https://travis-ci.org/nicolasbeauvais/vue-social-sharing)
[![Coverage Status](https://coveralls.io/repos/github/nicolasbeauvais/vue-social-sharing/badge.svg?branch=master)](https://coveralls.io/github/nicolasbeauvais/vue-social-sharing?branch=master)

A Vue.js component for sharing links to social networks

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
require('vue-social-sharing');
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
`title`        | String     |           | Sharing title (if available).
`description`  | String     |           | Sharing description (if available).
`quote`        | String     |           | Facebook quote (Only for facebook).
`twitter-user` | String     |           | Twitter user (Only for twitter).

## Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CHANGELOG.md).

## Issues
Please make sure to read the [Issue Reporting Checklist](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CONTRIBUTING.md#issue-reporting-guidelines) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Contribution
Please make sure to read the [Contributing Guide](https://github.com/nicolasbeauvais/vue-social-sharing/blob/master/CONTRIBUTING.md) before making a pull request.

## License

[MIT](http://opensource.org/licenses/MIT)
