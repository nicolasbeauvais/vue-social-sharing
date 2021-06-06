import AvailableNetworks from './networks'
import ShareNetwork from './share-network'

export default {
  install: (app, options) => {
    app.component(ShareNetwork.name, ShareNetwork);

    app.config.globalProperties.$SocialSharing = {
      options: {
        networks:
          options && options.hasOwnProperty('networks')
            ? Object.assign(AvailableNetworks, options.networks)
            : AvailableNetworks
      }
    };
  }
}

export { ShareNetwork }
