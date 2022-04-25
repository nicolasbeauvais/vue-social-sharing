import ShareNetwork from './share-network'

export default {
  install: (app, options) => {
    app.component(ShareNetwork.name, ShareNetwork)
    app.provide('shareNetworkOptions', options)
  }
}

export { ShareNetwork }
