import customShareNetwork from './custom-share-network.md'
import { ShareNetwork, useNetworks } from '../../src/vue-social-sharing'

export default {
  name: 'Custom Share Network',
  code: () => ({
    components: { ShareNetwork },
    setup () {
      const { setNetwork } = useNetworks()

      setNetwork('fakeblock', 'https://fakeblock.com/share?url=@url&title=@title')
    },
    template: `      
      <div id="share-network-list">
        <share-network
          network="fakeblock"
          url="https://news.vuejs.org/issues/180"
          title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
        >
          <i class="fab fah fa-lg fa-react"></i>
          <span>Custom Network</span>
        </share-network>
      </div>
      `
  }),
  params: {
    notes: customShareNetwork
  }
}
