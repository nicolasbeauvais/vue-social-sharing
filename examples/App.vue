<template>
  <div>
    <h1>Vue Social Sharing Demo</h1>
    <div class="share-network-list">
      <ShareNetwork
        v-for="network in networks"
        :network="network.network"
        :key="network.key"
        :style="{backgroundColor: network.color}"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :quote="sharing.quote"
        :hashtags="sharing.hashtags"
        :twitterUser="sharing.twitterUser"
      >
        <i :class="'fab fah fa-lg ' + network.icon"></i>
        <span>{{ network.name }}</span>
      </ShareNetwork>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sharing: {
        url: 'https://news.vuejs.org/issues/180',
        title: 'Say hi to Vite! A brand new, extremely fast development setup for Vue.',
        description: 'This week, I’d like to introduce you to "Vite", which means "Fast". It’s a brand new development setup created by Evan You.',
        quote: 'The hot reload is so fast it\'s near instant. - Evan You',
        hashtags: 'vuejs,vite,javascript',
        twitterUser: 'youyuxi'
      },
      networks: [
        { network: 'facebook', name: 'Facebook', icon: 'fa-facebook-f', color: '#1877f2' },
        { network: 'line', name: 'Line', icon: 'fa-line', color: '#00c300' },
        { network: 'linkedin', name: 'LinkedIn', icon: 'fa-linkedin', color: '#007bb5' },
        { network: 'odnoklassniki', name: 'Odnoklassniki', icon: 'fa-odnoklassniki', color: '#ed812b' },
        { network: 'pinterest', name: 'Pinterest', icon: 'fa-pinterest', color: '#bd081c' },
        { network: 'reddit', name: 'Reddit', icon: 'fa-reddit-alien', color: '#ff4500' },
        { network: 'skype', name: 'Skype', icon: 'fa-skype', color: '#00aff0' },
        { network: 'telegram', name: 'Telegram', icon: 'fa-telegram-plane', color: '#0088cc' },
        { network: 'twitter', name: 'Twitter', icon: 'fa-twitter', color: '#1da1f2' },
        { network: 'viber', name: 'Viber', icon: 'fa-viber', color: '#59267c' },
        { network: 'vk', name: 'Vk', icon: 'fa-vk', color: '#4a76a8' },
        { network: 'weibo', name: 'Weibo', icon: 'fa-weibo', color: '#e9152d' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'fa-whatsapp', color: '#25d366' },
        { network: 'fakeblock', name: 'Custom Network', icon: 'fa-vuejs', color: '#41b883' }
      ]
    }
  },

  created () {
    // Load font awesome
    const fa = document.createElement('script')
    fa.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js'
    document.head.appendChild(fa)
  }
}
</script>

<style>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  h1 {
    text-align: center;
    margin: 50px 0 80px;
  }

  .share-network-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    margin: auto;
  }

  a[class^="share-network-"] {
    flex: none;
    color: #FFFFFF;
    background-color: #333;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 10px 10px 0;
  }

  a[class^="share-network-"] .fah {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 8px;
    flex: 0 1 auto;
  }

  a[class^="share-network-"] span {
    padding: 0 10px;
    flex: 1 1 0%;
    font-weight: 500;
  }
</style>
