import AvailableNetworks from './networks'
import ShareNetwork from './share-network'

export default {
  install: (Vue, options) => {
    Vue.component(ShareNetwork.name, ShareNetwork)

    Vue.prototype.$SocialSharing = {
      options: {
        networks: Object.assign(AvailableNetworks, options.networks)
      }
    }
  }
}

export { ShareNetwork }
