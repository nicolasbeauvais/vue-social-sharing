import Vue from 'vue';
import SocialSharingMixin from './social-sharing-mixin';

export default {
  props: {
    /**
     * URL to share.
     * @var string
     */
    url: {
      type: String,
      default: undefined
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

  data () {
    return {
      /**
       * Available sharing networks.
       * @param object
       */
      networks: {
        facebook: {
          sharer: 'https://www.facebook.com/sharer/sharer.php?u=@url&title=@title&description=@description&quote=@quote',
          stats: 'https://api.facebook.com/method/links.getStats?urls=@url&format=json'
        },

        twitter: {
          sharer: 'https://twitter.com/intent/tweet?text=@title&url=@url&via=@twitteruser'
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
      },

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
        .replace(/@twitteruser/g, this.twitterUser);
    },

    /**
     * Shares URL in specified network.
     *
     * @param string network Social network key.
     */
    share: function (network) {
      if (this.url !== undefined) { this._openSharer(this._getSharer(network)); }
      this.$dispatch('social_shares_click', network, this.url);
    },

    /**
     * Touches network and dispatches click event.
     *
     * @param string network Social network key.
     */
    touch: function (network) {
      this.$dispatch('social_shares_click', network, this.url);
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
  ready: function () {
    if (this.url === undefined) { this.url = window.location.href; }

    // Allow for borders.
    this.popup.left = (window.screen.width / 2) - ((this.popup.width / 2) + 10);

    // Allow for title and status bars.
    this.popup.top = (window.screen.height / 2) - ((this.popup.height / 2) + 50);
  },

  /**
   * Set component aliases for buttons and links.
   */
  components: {
    'facebook': Vue.extend({
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'facebook' }; }
    }),
    'twitter': Vue.extend({
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'twitter' }; }
    }),
    'googleplus': Vue.extend({
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'googleplus' }; }
    }),
    'pinterest': Vue.extend({
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'pinterest' }; }
    }),
    'reddit': Vue.extend({
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'reddit' }; }
    }),
    'linkedin': Vue.extend({
      mixins: [SocialSharingMixin.popup],
      data: function () { return { network: 'linkedin' }; }
    }),
    'whatsapp': Vue.extend({
      mixins: [SocialSharingMixin.direct],
      data: function () { return { network: 'whatsapp', attr: { 'data-action': 'share/whatsapp/share' }}; }
    })
  }
};
