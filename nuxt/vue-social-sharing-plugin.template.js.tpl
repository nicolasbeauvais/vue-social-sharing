import Vue from 'vue';
import VueSocialSharing from 'vue-social-sharing';

// Initialize VueSocialSharing and set custom sharing networks if specified
Vue.use(VueSocialSharing, [<%= serialize(options) %>][0]);
