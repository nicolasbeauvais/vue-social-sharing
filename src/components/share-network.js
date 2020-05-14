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
     * URL to share.
     */
    url: {
      type: String,
      required: true
    },

    /**
     * Sharing title, if available for the selected network.
     */
    title: {
      type: String,
      default: ''
    },

    /**
     * Sharing description, if available for the selected network.
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
     * Specifies the image/media to be used, used for Pinterest
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
    }
  },

  data () {
    return {
      /**
       * Popup settings.
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
    }
  },

  computed: {
    /**
     * Network object for this component.
     */
    computedNetwork () {
      let networkName = this.network
      const ua = navigator.userAgent.toLowerCase()

      /**
       * On IOS, SMS sharing link need a special formatting
       * Source: https://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme#Body-only
       */
      if (networkName === 'sms' && (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1)) {
        networkName += '_ios'
      }

      return this.$SocialSharing.options.networks[networkName]
    },

    /**
     * Encoded hashtags for the current social network.
     */
    encodedHashtags () {
      if (this.network === 'facebook' && this.hashtags.length) {
        return '%23' + this.hashtags.split(',')[0]
      }

      return this.hashtags
    },

    /**
     * Create the url for sharing.
     */
    sharingUrl () {
      const sharer = this.computedNetwork.sharer

      /**
       * Twitter sharing shouldn't include empty parameter
       * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
       */
      if (this.network === 'twitter') {
        if (!this.hashtags.length) sharer.replace('&hashtags=@hashtags', '')
        if (!this.twitterUser) sharer.replace('@twitteruser', '')
      }

      return sharer
        .replace(/@url/g, encodeURIComponent(this.url))
        .replace(/@title/g, encodeURIComponent(this.title))
        .replace(/@description/g, encodeURIComponent(this.description))
        .replace(/@quote/g, encodeURIComponent(this.quote))
        .replace(/@hashtags/g, this.encodedHashtags)
        .replace(/@media/g, encodeURIComponent(this.media))
        .replace(/@twitteruser/g, '&via=' + encodeURIComponent(this.twitterUser))
    }
  },

  render: function (createElement) {
    if (!Object.prototype.hasOwnProperty.call(this.$SocialSharing.options.networks, this.network)) {
      throw new Error(`Network ${this.network} does not exist`)
    }

    return createElement(this.tag, {
      class: `share-network-${this.network}`,
      on: {
        click: () => this[this.computedNetwork.type === 'popup' ? 'share' : 'touch']()
      }
    }, this.$slots.default)
  },

  methods: {
    /**
     * Shares URL in specified network.
     */
    share () {
      this.openSharer()

      this.$root.$emit('share_network_open', this.computedNetwork, this.url)
      this.$emit('open', this.computedNetwork, this.url)
    },

    /**
     * Touches network and emits click event.
     */
    touch () {
      window.open(this.sharingUrl, '_self')

      this.$root.$emit('share_network_open', this.computedNetwork, this.url)
      this.$emit('open', this.computedNetwork, this.url)
    },

    /**
     * Opens sharer popup.
     */
    openSharer () {
      // If a popup window already exist, we close it and trigger a change event.
      if (this.popup.window && this.popup.interval) {
        clearInterval(this.popup.interval)

        // Force close (for Facebook)
        this.popup.window.close()

        this.$root.$emit('share_network_change', this.computedNetwork, this.url)
        this.$emit('change', this.computedNetwork, this.url)
      }

      this.popup.window = window.open(
        this.sharingUrl,
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
      )

      this.popup.window.focus()

      // Create an interval to detect popup closing event
      this.popup.interval = setInterval(() => {
        if (!this.popup.window || this.popup.window.closed) {
          clearInterval(this.popup.interval)

          this.popup.window = undefined

          this.$root.$emit('share_network_close', this.computedNetwork, this.url)
          this.$emit('close', this.computedNetwork, this.url)
        }
      }, 500)
    }
  }
}
