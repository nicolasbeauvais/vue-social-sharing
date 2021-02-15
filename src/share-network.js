import AvailableNetworks from './networks'

let $window = typeof window !== 'undefined' ? window : null

export function mockWindow (self) {
  $window = self || window // mock window for unit testing
}

export default {
  name: 'ShareNetwork',

  props: {
    /**
     * Name of the network to display.
     */
    network: {
      type: String,
      required: true
    },

    /**
     * URL of the content to share.
     */
    url: {
      type: String,
      required: true
    },

    /**
     * Title of the content to share.
     */
    title: {
      type: String,
      required: true
    },

    /**
     * Description of the content to share.
     */
    description: {
      type: String,
      default: ''
    },

    /**
     * Quote content, used for Facebook.
     */
    quote: {
      type: String,
      default: ''
    },

    /**
     * Hashtags, used for Twitter and Facebook.
     */
    hashtags: {
      type: String,
      default: ''
    },

    /**
     * Twitter user, used for Twitter
     * @var string
     */
    twitterUser: {
      type: String,
      default: ''
    },

    /**
     * Media to share, used for Pinterest
     */
    media: {
      type: String,
      default: ''
    },

    /**
     * HTML tag used by the Network component.
     */
    tag: {
      type: String,
      default: 'a'
    },

    /**
     * Properties to configure the popup window.
     */
    popup: {
      type: Object,
      default: () => ({
        width: 626,
        height: 436
      })
    }
  },

  data () {
    return {
      popupTop: 0,
      popupLeft: 0,
      popupWindow: undefined,
      popupInterval: null
    }
  },

  computed: {
    /**
     * List of available networks
     */
    networks () {
      return this.$SocialSharing
        ? this.$SocialSharing.options.networks
        : AvailableNetworks
    },

    /**
     * Formatted network name.
     */
    key () {
      return this.network.toLowerCase()
    },

    /**
     * Network sharing raw sharing link.
     */
    rawLink () {
      const ua = navigator.userAgent.toLowerCase()

      /**
       * On IOS, SMS sharing link need a special formatting
       * Source: https://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme#Body-only
       */
      if (this.key === 'sms' && (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1)) {
        return this.networks[this.key].replace(':?', ':&')
      }

      return this.networks[this.key]
    },

    /**
     * Create the url for sharing.
     */
    shareLink () {
      let link = this.rawLink

      /**
       * Twitter sharing shouldn't include empty parameter
       * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
       */
      if (this.key === 'twitter') {
        if (!this.hashtags.length) link = link.replace('&hashtags=@h', '')
        if (!this.twitterUser.length) link = link.replace('@tu', '')
      }

      return link
        .replace(/@tu/g, '&via=' + encodeURIComponent(this.twitterUser))
        .replace(/@u/g, encodeURIComponent(this.url))
        .replace(/@t/g, encodeURIComponent(this.title))
        .replace(/@d/g, encodeURIComponent(this.description))
        .replace(/@q/g, encodeURIComponent(this.quote))
        .replace(/@h/g, this.encodedHashtags)
        .replace(/@m/g, encodeURIComponent(this.media))
    },

    /**
     * Encoded hashtags for the current social network.
     */
    encodedHashtags () {
      if (this.key === 'facebook' && this.hashtags.length) {
        return '%23' + this.hashtags.split(',')[0]
      }

      return this.hashtags
    }
  },

  render: function (createElement) {
    if (!this.networks.hasOwnProperty(this.key)) {
      throw new Error('Network ' + this.key + ' does not exist')
    }

    const node = {
      class: 'share-network-' + this.key,
      on: {
        click: () => this[this.rawLink.substring(0, 4) === 'http' ? 'share' : 'touch']()
      }
    }

    if (this.tag === 'a') node.attrs = { href: 'javascript:void(0)' }

    return createElement(this.tag, node, this.$slots.default)
  },

  methods: {
    /**
     * Center the popup on multi-screens
     * http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen/32261263
     */
    resizePopup () {
      const width = $window.innerWidth || (document.documentElement.clientWidth || $window.screenX)
      const height = $window.innerHeight || (document.documentElement.clientHeight || $window.screenY)
      const systemZoom = width / $window.screen.availWidth

      this.popupLeft = (width - this.popup.width) / 2 / systemZoom + ($window.screenLeft !== undefined ? $window.screenLeft : $window.screenX)
      this.popupTop = (height - this.popup.height) / 2 / systemZoom + ($window.screenTop !== undefined ? $window.screenTop : $window.screenY)
    },

    /**
     * Shares URL in specified network.
     */
    share () {
      this.resizePopup()

      // If a popup window already exist, we close it and trigger a change event.
      if (this.popupWindow && this.popupInterval) {
        clearInterval(this.popupInterval)

        // Force close (for Facebook)
        this.popupWindow.close()

        this.emit('change')
      }

      this.popupWindow = $window.open(
        this.shareLink,
        'sharer-' + this.key,
        ',height=' + this.popup.height +
        ',width=' + this.popup.width +
        ',left=' + this.popupLeft +
        ',top=' + this.popupTop +
        ',screenX=' + this.popupLeft +
        ',screenY=' + this.popupTop
      )

      // If popup are prevented (AdBlocker, Mobile App context..), popup.window stays undefined and we can't display it
      if (!this.popupWindow) return

      this.popupWindow.focus()

      // Create an interval to detect popup closing event
      this.popupInterval = setInterval(() => {
        if (!this.popupWindow || this.popupWindow.closed) {
          clearInterval(this.popupInterval)

          this.popupWindow = null

          this.emit('close')
        }
      }, 500)

      this.emit('open')
    },

    /**
     * Touches network and emits click event.
     */
    touch () {
      window.open(this.shareLink, '_blank')

      this.emit('open')
    },

    emit (name) {
      this.$root.$emit('share_network_' + name, this.key, this.url)
      this.$emit(name, this.key, this.url)
    }
  }
}
