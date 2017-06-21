/*!
 * vue-social-sharing v2.2.3 
 * (c) 2017 nicolasbeauvais
 * Released under the MIT License.
 */
'use strict';

var facebook = {"sharer":"https://www.facebook.com/sharer/sharer.php?u=@url&title=@title&description=@description&quote=@quote","type":"popup"};
var googleplus = {"sharer":"https://plus.google.com/share?url=@url","type":"popup"};
var linkedin = {"sharer":"https://www.linkedin.com/shareArticle?mini=true&url=@url&title=@title&summary=@description","type":"popup"};
var pinterest = {"sharer":"https://pinterest.com/pin/create/button/?url=@url&media=@media&description=@title","type":"popup"};
var reddit = {"sharer":"https://www.reddit.com/submit?url=@url&title=@title","type":"popup"};
var twitter = {"sharer":"https://twitter.com/intent/tweet?text=@title&url=@url&hashtags=@hashtags@twitteruser","type":"popup"};
var vk = {"sharer":"https://vk.com/share.php?url=@url&title=@title&description=@description&image=@media&noparse=true","type":"popup"};
var weibo = {"sharer":"http://service.weibo.com/share/share.php?url=@url&title=@title","type":"popup"};
var whatsapp = {"sharer":"whatsapp://send?text=@description%0D%0A@url","type":"direct","action":"share/whatsapp/share"};
var telegram = {"sharer":"https://t.me/share/url?url=@url&text=@description","type":"popup"};
var line = {"sharer":"http://line.me/R/msg/text/?@description%0D%0A@url","type":"popup"};
var skype = {"sharer":"https://web.skype.com/share?url=@description%0D%0A@url","type":"popup"};
var Networks = {
	facebook: facebook,
	googleplus: googleplus,
	linkedin: linkedin,
	pinterest: pinterest,
	reddit: reddit,
	twitter: twitter,
	vk: vk,
	weibo: weibo,
	whatsapp: whatsapp,
	telegram: telegram,
	line: line,
	skype: skype
};

var SocialSharingNetwork = {
  functional: true,

  props: {
    network: {
      type: String,
      default: ''
    }
  },

  render: function render (createElement, context) {
    var network = Networks[context.props.network];

    return createElement(context.parent.networkTag, {
      class: context.data.staticClass || null,
      style: context.data.staticStyle || null,
      attrs: {
        id: context.data.attrs.id || null,
        'data-link': network.type === 'popup'
          ? '#share-' + context.props.network
          : context.parent.createSharingUrl(context.props.network),
        'data-action': network.type === 'popup' ? null : network.action
      },
      on: {
        click: network.type === 'popup' ? function () {
          context.parent.share(context.props.network);
        } : function () {
          context.parent.touch(context.props.network);
        }
      }
    }, context.children);
  }
};

var inBrowser = typeof window !== 'undefined';
var $window = inBrowser ? window : null;

var SocialSharing = {
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
      default: 'span'
    }
  },

  data: function data () {
    return {
      /**
       * Available sharing networks.
       * @param object
       */
      networks: Networks,

      /**
       * Popup settings.
       * @param object
       */
      popup: {
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
        interval: null
      }
    };
  },

  methods: {
    /**
     * Returns generated sharer url.
     *
     * @param network Social network key.
     */
    createSharingUrl: function createSharingUrl (network) {
      return this.networks[network].sharer
        .replace(/@url/g, encodeURIComponent(this.url))
        .replace(/@title/g, encodeURIComponent(this.title))
        .replace(/@description/g, encodeURIComponent(this.description))
        .replace(/@quote/g, encodeURIComponent(this.quote))
        .replace(/@hashtags/g, this.hashtags)
        .replace(/@media/g, this.media)
        .replace(/@twitteruser/g, this.twitterUser ? '&via=' + this.twitterUser : '');
    },

    /**
     * Shares URL in specified network.
     *
     * @param string network Social network key.
     */
    share: function share (network) {
      this.openSharer(network, this.createSharingUrl(network));
      this.$root.$emit('social_shares_open', network, this.url);
    },

    /**
     * Touches network and emits click event.
     *
     * @param string network Social network key.
     */
    touch: function touch (network) {
      window.open(this.createSharingUrl(network), '_self');
      this.$root.$emit('social_shares_open', network, this.url);
    },

    /**
     * Opens sharer popup.
     *
     * @param string url Url to share.
     */
    openSharer: function openSharer (network, url) {
      var this$1 = this;

      // If a popup window already exist it will be replaced, trigger a close event.
      if (this.popup.window && this.popup.interval) {
        clearInterval(this.popup.interval);
        this.popup.window.close();// Force close (for Facebook)
        this.$root.$emit('social_shares_change', network, this.url);
      }

      this.popup.window = window.open(
        url,
        'sharer',
        'status=' + (this.popup.status ? 'yes' : 'no') +
        ',height=' + this.popup.height +
        ',width=' + this.popup.width +
        ',resizable=' + (this.popup.resizable ? 'yes' : 'no') +
        ',left=' + this.popup.left +
        ',top=' + this.popup.top +
        ',screenX=' + this.popup.left +
        ',screenY=' + this.popup.top +
        ',toolbar=' + (this.popup.toolbar ? 'yes' : 'no') +
        ',menubar=' + (this.popup.menubar ? 'yes' : 'no') +
        ',scrollbars=' + (this.popup.scrollbars ? 'yes' : 'no') +
        ',location=' + (this.popup.location ? 'yes' : 'no') +
        ',directories=' + (this.popup.directories ? 'yes' : 'no')
      );

      this.popup.window.focus();

      // Create an interval to detect popup closing event
      this.popup.interval = setInterval(function () {
        if (this$1.popup.window.closed) {
          clearInterval(this$1.popup.interval);
          this$1.popup.window = undefined;
          this$1.$root.$emit('social_shares_close', network, this$1.url);
        }
      }, 500);
    }
  },

  /**
   * Sets popup default dimensions.
   */
  mounted: function mounted () {
    if (!inBrowser) {
      return;
    }

    /**
     * Center the popup on dual screens
     * http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen/32261263
     */
    var dualScreenLeft = $window.screenLeft !== undefined ? $window.screenLeft : screen.left;
    var dualScreenTop = $window.screenTop !== undefined ? $window.screenTop : screen.top;

    var width = $window.innerWidth ? $window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width);
    var height = $window.innerHeight ? $window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height);

    this.popup.left = ((width / 2) - (this.popup.width / 2)) + dualScreenLeft;
    this.popup.top = ((height / 2) - (this.popup.height / 2)) + dualScreenTop;
  },

  /**
   * Set component aliases for buttons and links.
   */
  components: {
    'network': SocialSharingNetwork
  }
};

SocialSharing.version = '2.2.3';

SocialSharing.install = function (Vue) {
  Vue.component('social-sharing', SocialSharing);
};

if (typeof window !== 'undefined') {
  window.SocialSharing = SocialSharing;
}

module.exports = SocialSharing;