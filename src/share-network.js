import { h, computed, isVue2 } from 'vue-demi'
import { useNetworks } from './hooks/networks'
import { usePopup } from './hooks/popup'

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
  setup (props, { attrs, slots }) {
    const { share, touch } = usePopup()
    const { networks } = useNetworks()
    const key = computed(() => props.network.toLowerCase())
    const rawLink = computed(() => {
      const ua = navigator.userAgent.toLowerCase()

      /**
       * On IOS, SMS sharing link need a special formatting
       * Source: https://weblog.west-wind.com/posts/2013/Oct/09/Prefilling-an-SMS-on-Mobile-Devices-with-the-sms-Uri-Scheme#Body-only
       */
      if (key.value === 'sms' && (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1)) {
        return networks.value[key.value].replace(':?', ':&')
      }

      return networks.value[key.value]
    })
    const encodedHashtags = computed(() => {
      if (key.value === 'facebook' && props.hashtags.length) {
        return '%23' + props.hashtags.split(',')[0]
      }

      return props.hashtags
    })
    const shareLink = computed(() => {
      let link = rawLink.value

      /**
       * Twitter sharing shouldn't include empty parameter
       * Source: https://github.com/nicolasbeauvais/vue-social-sharing/issues/143
       */
      if (key.value === 'twitter') {
        if (!props.hashtags.length) link = link.replace('&hashtags=@h', '')
        if (!props.twitterUser.length) link = link.replace('@tu', '')
      }

      return link
        .replace(/@tu/g, '&via=' + encodeURIComponent(props.twitterUser))
        .replace(/@u/g, encodeURIComponent(props.url))
        .replace(/@t/g, encodeURIComponent(props.title))
        .replace(/@d/g, encodeURIComponent(props.description))
        .replace(/@q/g, encodeURIComponent(props.quote))
        .replace(/@h/g, encodedHashtags.value)
        .replace(/@m/g, encodeURIComponent(props.media))
    })

    if (!(key.value in networks.value)) {
      throw new Error(`Network ${key.value} does not exist!`)
    }

    let node = {
      class: `share-network-${key.value}`,
      attrs
    }

    const onClick = (e) => {
      rawLink.value.substring(0, 4) === 'http'
        ? share(shareLink.value, key.value)
        : touch(shareLink.value)
      e.preventDefault()
    }

    if (isVue2) {
      node = {
        ...node,
        on: {
          click: onClick
        },
        attrs
      }
    } else {
      node = {
        ...node,
        ...attrs,
        onClick
      }
    }

    if (props.tag === 'a') {
      node.href = '#'
    }

    return () => h(props.tag, node, slots.default())
  }
}
