import ShareNetwork from './share-network'

export default {
  install: (app, options) => {
    app.component(ShareNetwork.name, ShareNetwork)
  }
}

export { ShareNetwork }
