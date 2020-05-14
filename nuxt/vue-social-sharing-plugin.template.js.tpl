import Vue from 'vue';
import VueSocialSharing from 'vue-social-sharing';

// Initialize VueSocialSharing and set custom sharing networks if needed
Vue.use(VueSocialSharing, {
  networks: {
    fakeblock: {
      sharer: 'https://fakeblock.com/share?url=@url&title=@title',
      type: 'popup'
    }
  }
});

export default ({ app }) => {
  // ...
};
