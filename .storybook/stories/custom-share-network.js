import customShareNetwork from './custom-share-network.md'

export default {
  name: 'Custom Share Network',
  code: () => ({
    template: `      
      <div id="share-network-list">
        <ShareNetwork
          network="fakeblock"
          url="https://news.vuejs.org/issues/180"
          title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
        >
          <i class="fab fah fa-lg fa-react"></i>
          <span>Custom Network</span>
        </ShareNetwork>
      </div>
      `,
  }),
  params: {
    notes: customShareNetwork
  }
}
