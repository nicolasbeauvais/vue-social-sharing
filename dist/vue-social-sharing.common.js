/*!
 * vue-social-sharing v1.1.0 
 * (c) 2017 nicolasbeauvais
 * Released under the MIT License.
 */
'use strict';

var SocialSharingMixin = {
  /**
   * Mixin for popup link sharers.
   */
  popup: {
    template: '<a :href="\'#share-\'+ network" @click.prevent="$parent.share(network)"><slot></slot></a>'
  },

  /**
   * Mixin for direct link sharers.
   */
  direct: {
    template: '<a v-bind:href="$parent._getSharer(network)" :data-action="attributes(\'data-action\')" @click="$parent.touch(network)"><slot></slot></a>',
    methods: {
      /**
       * Returns attribute value by key.
       *
       * @param key
       */
      attributes: function attributes (key) {
        return this.attr !== undefined && this.attr[key] !== undefined
          ? this.attr[key]
          : undefined;
      }
    }
  }
};

var $window = window;

var networks = {
  facebook: {
    sharer: 'https://www.facebook.com/sharer/sharer.php?u=@url&title=@title&description=@description&quote=@quote',
    stats: 'https://api.facebook.com/method/links.getStats?urls=@url&format=json'
  },

  twitter: {
    sharer: 'https://twitter.com/intent/tweet?text=@title&url=@url&hashtags=@hashtags@twitteruser'
  },

  googleplus: {
    sharer: 'https://plus.google.com/share?url=@url',
    stats: 'https://plusone.google.com/_/+1/fastbutton?url=@url'
  },

  pinterest: {
    sharer: 'https://pinterest.com/pin/create/button/?url=@url&description=@title'
  },

  reddit: {
    sharer: 'http://www.reddit.com/submit?url=@url&title=@title'
  },

  linkedin: {
    sharer: 'https://www.linkedin.com/shareArticle?mini=true&url=@url&title=@title&summary=@description'
  },

  whatsapp: {
    sharer: 'whatsapp://send?text=@url'
  }
};

var SocialSharing = {
  props: {
    /**
     * URL to share.
     * @var string
     */
    url: {
      type: String,
      default: $window.location.href
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
    }
  },

  data: function data () {
    return {
      /**
       * Available sharing networks.
       * @param object
       */
      networks: networks,

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
        window: undefined
      }
    };
  },

  methods: {
    /**
     * Returns generated sharer url.
     *
     * @param network Social network key.
     */
    _getSharer: function (network) {
      return this.networks[network].sharer
        .replace(/@url/g, encodeURIComponent(this.url))
        .replace(/@title/g, this.title)
        .replace(/@description/g, this.description)
        .replace(/@quote/g, this.quote)
        .replace(/@hashtags/g, this.hashtags)
        .replace(/@twitteruser/g, this.twitterUser ? '&via=' + this.twitterUser : '');
    },

    /**
     * Shares URL in specified network.
     *
     * @param string network Social network key.
     */
    share: function (network) {
      this._openSharer(this._getSharer(network));
      this.$emit('social_shares_click', network, this.url);
    },

    /**
     * Touches network and emits click event.
     *
     * @param string network Social network key.
     */
    touch: function (network) {
      this.$emit('social_shares_click', network, this.url);
    },

    /**
     * Opens sharer popup.
     *
     * @param string url Url to share.
     */
    _openSharer: function (url) {
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
    }
  },

  /**
   * Sets default url if non is indicated.
   */
  mounted: function () {
    // Allow for borders.
    this.popup.left = ($window.screen.width / 2) - ((this.popup.width / 2) + 10);

    // Allow for title and status bars.
    this.popup.top = ($window.screen.height / 2) - ((this.popup.height / 2) + 50);
  },

  /**
   * Set component aliases for buttons and links.
   */
  components: {
    'facebook': {
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'facebook' }; }
    },
    'twitter': {
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'twitter' }; }
    },
    'googleplus': {
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'googleplus' }; }
    },
    'pinterest': {
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'pinterest' }; }
    },
    'reddit': {
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'reddit' }; }
    },
    'linkedin': {
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'linkedin' }; }
    },
    'whatsapp': {
      mixins: [SocialSharingMixin.direct],
      data: function () {
        return { network: 'whatsapp', attr: { 'data-action': 'share/whatsapp/share' }};
      }
    }
  }
};

SocialSharing.version = '1.1.0';

SocialSharing.install = function (Vue) {
  Vue.component('social-sharing', SocialSharing);
};

if (typeof window !== 'undefined') {
  window.SocialSharing = SocialSharing;
}

module.exports = SocialSharing;