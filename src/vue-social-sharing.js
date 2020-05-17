import AvailableNetworks from './networks.json'
import ShareNetwork from './share-network'

class VueSocialSharing {
  options = {
    networks: AvailableNetworks
  }

  constructor (options = {}) {
    if (Object.prototype.hasOwnProperty.call(options, 'networks')) {
      this.options.networks = { ...AvailableNetworks, ...options.networks }
    }
  }
}

VueSocialSharing.install = (Vue, options) => {
  const instance = new VueSocialSharing(options)

  Vue.component(ShareNetwork.name, ShareNetwork)

  Vue.prototype.$SocialSharing = instance
}

export default VueSocialSharing

export { ShareNetwork }
