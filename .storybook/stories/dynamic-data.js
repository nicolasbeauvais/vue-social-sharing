import dynamicDataNotes from './dynamic-data-notes.md'

export default {
  name: 'Dynamic data',
  code: () => ({
    template: `
      <div style="text-align: center;">
        <p>Change the url to share on Twitter:</p>
        <input type="text" v-model="url" style="margin-bottom: 20px;padding: 5px;min-width: 230px;text-align: center;">

        <div id="share-network-list">
          <ShareNetwork
            network="twitter"
            :url="url"
            :title="title"
            :description="description"
            :hashtags="hashtags"
            :twitterUser="twitterUser"
          >
            <i class="fab fah fa-lg fa-twitter"></i>
            <span>Share on Twitter</span>
          </ShareNetwork>
        </div>
      </div>
      `,
    data () {
      return {
        url: 'https://news.vuejs.org/issues/180',
        title: 'Say hi to Vite! A brand new, extremely fast development setup for Vue.',
        description: 'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        hashtags: 'vuejs,vite,javascript',
        twitterUser: 'youyuxi'
      }
    }
  }),
  params: {
    notes: dynamicDataNotes
  }
}
