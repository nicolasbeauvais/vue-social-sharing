import SocialSharing from './social-sharing';

SocialSharing.version = '2.2.7';

SocialSharing.install = (Vue) => {
  Vue.component('social-sharing', SocialSharing);
};

if (typeof window !== 'undefined') {
  window.SocialSharing = SocialSharing;
}

export default SocialSharing;
