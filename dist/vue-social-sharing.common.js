/*!
 * vue-social-sharing v2.4.7 
 * (c) 2020 nicolasbeauvais
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var email = {
	sharer: "mailto:?subject=@title&body=@url%0D%0A%0D%0A@description",
	type: "direct"
};
var facebook = {
	sharer: "https://www.facebook.com/sharer/sharer.php?u=@url&title=@title&description=@description&quote=@quote&hashtag=@hashtags",
	type: "popup"
};
var googleplus = {
	sharer: "https://plus.google.com/share?url=@url",
	type: "popup"
};
var line = {
	sharer: "http://line.me/R/msg/text/?@description%0D%0A@url",
	type: "popup"
};
var linkedin = {
	sharer: "https://www.linkedin.com/shareArticle?mini=true&url=@url&title=@title&summary=@description",
	type: "popup"
};
var odnoklassniki = {
	sharer: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=@url&st.comments=@description",
	type: "popup"
};
var pinterest = {
	sharer: "https://pinterest.com/pin/create/button/?url=@url&media=@media&description=@title",
	type: "popup"
};
var reddit = {
	sharer: "https://www.reddit.com/submit?url=@url&title=@title",
	type: "popup"
};
var skype = {
	sharer: "https://web.skype.com/share?url=@description%0D%0A@url",
	type: "popup"
};
var telegram = {
	sharer: "https://t.me/share/url?url=@url&text=@description",
	type: "popup"
};
var twitter = {
	sharer: "https://twitter.com/intent/tweet?text=@title&url=@url&hashtags=@hashtags@twitteruser",
	type: "popup"
};
var viber = {
	sharer: "viber://forward?text=@url @description",
	type: "direct"
};
var vk = {
	sharer: "https://vk.com/share.php?url=@url&title=@title&description=@description&image=@media&noparse=true",
	type: "popup"
};
var weibo = {
	sharer: "http://service.weibo.com/share/share.php?url=@url&title=@title",
	type: "popup"
};
var whatsapp = {
	sharer: "https://api.whatsapp.com/send?text=@description%0D%0A@url",
	type: "popup",
	action: "share/whatsapp/share"
};
var sms = {
	sharer: "sms:?body=@url%20@description",
	type: "direct"
};
var sms_ios = {
	sharer: "sms:;body=@url%20@description",
	type: "direct"
};
var BaseNetworks = {
	email: email,
	facebook: facebook,
	googleplus: googleplus,
	line: line,
	linkedin: linkedin,
	odnoklassniki: odnoklassniki,
	pinterest: pinterest,
	reddit: reddit,
	skype: skype,
	telegram: telegram,
	twitter: twitter,
	viber: viber,
	vk: vk,
	weibo: weibo,
	whatsapp: whatsapp,
	sms: sms,
	sms_ios: sms_ios
};

var inBrowser = typeof window !== 'undefined';
var $window = inBrowser ? window : null;
/**
 * @typedef {object} NetworkData
 * @property {string} sharer
 * @property {string} type
 */

/**
 * @typedef {{[network: string]: NetworkData}} Netowrks
 */

var popupSettings = {
  status: false,
  resizable: true,
  toolbar: false,
  menubar: false,
  scrollbars: false,
  location: false,
  directories: false,
  width: 626,
  height: 436,
  top: 0,
  left: 0,
  window: undefined,

  /** @type {number|null} */
  interval: null
};
var SocialSharing = {
  name: 'SocialSharing',
  props: {
    /**
     * URL to share.
     * @var string
     */
    url: {
      type: String,
      default: inBrowser ? window.location.href : ''
    },

    /**
     * Sharing title, if available by network.
     * @var string
     */
    title: {
      type: String,
      default: ''
    },

    /**
     * Sharing description, if available by network.
     * @var string
     */
    description: {
      type: String,
      default: ''
    },

    /**
     * Facebook quote
     * @var string
     */
    quote: {
      type: String,
      default: ''
    },

    /**
     * Twitter hashtags
     * @var string
     */
    hashtags: {
      type: String,
      default: ''
    },

    /**
     * Twitter user.
     * @var string
     */
    twitterUser: {
      type: String,
      default: ''
    },

    /**
     * Flag that indicates if counts should be retrieved.
     * - NOT WORKING IN CURRENT VERSION
     * @var mixed
     */
    withCounts: {
      type: [String, Boolean],
      default: false
    },

    /**
     * Google plus key.
     * @var string
     */
    googleKey: {
      type: String,
      default: undefined
    },

    /**
     * Pinterest Media URL.
     * Specifies the image/media to be used.
     */
    media: {
      type: String,
      default: ''
    },

    /**
     * Network sub component tag.
     * Default to span tag
     */
    networkTag: {
      type: String,
      default: 'a'
    },

    /**
     * Additional or overridden networks.
     * Default to BaseNetworks
     *
     * @type {import('vue').PropOptions<Netowrks>}
     */
    networks: {
      type: Object,
      default: null
    }
  },
  data: function data() {
    return {
      /**
       * Popup settings.
       * @type {typeof popupSettings}
       */
      popup: Object.assign({}, popupSettings)
    };
  },
  computed: {
    /**
     * Available sharing networks.
     * @returns {Netowrks}
     */
    baseNetworks: function baseNetworks() {
      return Object.assign({}, BaseNetworks, this.networks);
    }
  },
  methods: {
    /**
     * Returns generated sharer url.
     *
     * @param {string} network Social network key.
     */
    createSharingUrl: function createSharingUrl(network) {
      var ua = navigator.userAgent.toLowerCase();
      /**
       * On IOS, SMS sharing link need a special formating
       * Source: https://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme#Body-only
        */

      if (network === 'sms' && (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1)) {
        network += '_ios';
      }

      var url = this.baseNetworks[network].sharer;
      /**
       * On IOS, Twitter sharing shouldn't include a hashtag parameter if the hashtag value is empty
       * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
        */

      if (network === 'twitter' && this.hashtags.length === 0) {
        url = url.replace('&hashtags=@hashtags', '');
      }

      return url.replace(/@url/g, encodeURIComponent(this.url)).replace(/@title/g, encodeURIComponent(this.title)).replace(/@description/g, encodeURIComponent(this.description)).replace(/@quote/g, encodeURIComponent(this.quote)).replace(/@hashtags/g, this.generateHashtags(network, this.hashtags)).replace(/@media/g, this.media).replace(/@twitteruser/g, this.twitterUser ? '&via=' + this.twitterUser : '');
    },

    /**
     * Encode hashtags for the specified social network.
     *
     * @param {string} network Social network key
     * @param {string} hashtags All hashtags specified separated by comma
     */
    generateHashtags: function generateHashtags(network, hashtags) {
      if (network === 'facebook' && hashtags.length > 0) {
        return '%23' + hashtags.split(',')[0];
      }

      return hashtags;
    },

    /**
     * Shares URL in specified network.
     *
     * @param {string} network Social network key.
     */
    share: function share(network) {
      this.openSharer(network, this.createSharingUrl(network));
      this.$root.$emit('social_shares_open', network, this.url);
      this.$emit('open', network, this.url);
    },

    /**
     * Touches network and emits click event.
     *
     * @param {string} network Social network key.
     */
    touch: function touch(network) {
      window.open(this.createSharingUrl(network), '_self');
      this.$root.$emit('social_shares_open', network, this.url);
      this.$emit('open', network, this.url);
    },

    /**
     * Opens sharer popup.
     *
     * @param {string} network Social network key
     * @param {string} url Url to share.
     */
    openSharer: function openSharer(network, url) {
      var this$1 = this;
      this.setDefaultDimentionsForPopup(); // If a popup window already exist it will be replaced, trigger a close event.

      /** @type {Window|null} */

      var popupWindow = null;

      if (popupWindow && this.popup.interval) {
        clearInterval(this.popup.interval);
        popupWindow.close(); // Force close (for Facebook)

        this.$root.$emit('social_shares_change', network, this.url);
        this.$emit('change', network, this.url);
      }

      popupWindow = window.open(url, 'sharer', 'status=' + (this.popup.status ? 'yes' : 'no') + ',height=' + this.popup.height + ',width=' + this.popup.width + ',resizable=' + (this.popup.resizable ? 'yes' : 'no') + ',left=' + this.popup.left + ',top=' + this.popup.top + ',screenX=' + this.popup.left + ',screenY=' + this.popup.top + ',toolbar=' + (this.popup.toolbar ? 'yes' : 'no') + ',menubar=' + (this.popup.menubar ? 'yes' : 'no') + ',scrollbars=' + (this.popup.scrollbars ? 'yes' : 'no') + ',location=' + (this.popup.location ? 'yes' : 'no') + ',directories=' + (this.popup.directories ? 'yes' : 'no'));

      if (popupWindow) {
        popupWindow.focus();
      } // Create an interval to detect popup closing event


      this.popup.interval = setInterval(function () {
        if (!popupWindow || popupWindow.closed) {
          clearInterval(this$1.popup.interval);
          popupWindow = null;
          this$1.$root.$emit('social_shares_close', network, this$1.url);
          this$1.$emit('close', network, this$1.url);
        }
      }, 500);
    },
    setDefaultDimentionsForPopup: function setDefaultDimentionsForPopup() {
      if (!inBrowser || !$window) {
        return;
      }
      /**
       * Center the popup on dual screens
       * http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen/32261263
       */


      var dualScreenLeft = $window.screenLeft !== undefined ? $window.screenLeft : $window.screenX;
      var dualScreenTop = $window.screenTop !== undefined ? $window.screenTop : $window.screenY;
      var width = $window.innerWidth ? $window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = $window.innerHeight ? $window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      var systemZoom = width / $window.screen.availWidth;
      var left = (width - this.popup.width) / 2 / systemZoom + dualScreenLeft;
      var top = (height - this.popup.height) / 2 / systemZoom + dualScreenTop;
      this.popup.left = left;
      this.popup.top = top;
    }
  },
  provide: function provide() {
    var networks = this.baseNetworks;
    var tag = this.networkTag;
    return {
      networks: networks,
      tag: tag,
      createSharingUrl: this.createSharingUrl,
      share: this.share,
      touch: this.touch
    };
  },
  render: function render() {
    var networks = this.baseNetworks;
    var tag = this.networkTag;
    return this.$scopedSlots.default({
      networks: networks,
      tag: tag,
      createSharingUrl: this.createSharingUrl,
      share: this.share,
      touch: this.touch
    });
  }
};

var warnNoParent = function () {
  return console.warn('SocialSharingNetwork should be child of SocialSharing');
};

var SocialSharingNetwork = {
  name: 'SocialSharingNetwork',
  props: {
    network: {
      type: String,
      default: ''
    }
  },
  inject: {
    'networks': {
      default: Object.assign({}, BaseNetworks)
    },
    'tag': {
      default: 'a'
    },
    'createSharingUrl': {
      default: warnNoParent
    },
    'share': {
      default: warnNoParent
    },
    'touch': {
      default: warnNoParent
    }
  },
  render: function render(createElement) {
    var this$1 = this;
    var network = this.networks[this.network];

    if (!network) {
      console.warn("Network " + this.network + " does not exist");
      return createElement(this.tag);
    }

    var attrs = {
      'data-link': network.type === 'popup' ? '#share-' + this.network : this.createSharingUrl(this.network),
      'data-action': network.type === 'popup' ? null : network.action
    };

    if (this.tag === 'a') {
      attrs.href = this.createSharingUrl(this.network);
    }

    return createElement(this.tag, {
      attrs: attrs,
      on: {
        click: function (event) {
          event.preventDefault();

          if (network.type === 'popup') {
            this$1.share(this$1.network);
          } else {
            this$1.touch(this$1.network);
          }
        }
      }
    }, this.$slots.default);
  }
};

SocialSharing.version = '2.4.7';

SocialSharing.install = function (Vue) {
  Vue.component(SocialSharing.name, SocialSharing);
  Vue.component(SocialSharingNetwork.name, SocialSharingNetwork);
};

if (typeof window !== 'undefined') {
  window.SocialSharing = SocialSharing;
}

exports.SocialSharing = SocialSharing;
exports.SocialSharingNetwork = SocialSharingNetwork;
exports['default'] = SocialSharing;