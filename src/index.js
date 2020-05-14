import SocialSharing from './social-sharing';
import SocialSharingNetwork from './social-sharing-network';

SocialSharing.version = '2.4.7';

SocialSharing.install = (Vue) => {
  Vue.component(SocialSharing.name, SocialSharing);
  Vue.component(SocialSharingNetwork.name, SocialSharingNetwork);
};

if (typeof window !== 'undefined') {
  window.SocialSharing = SocialSharing;
}

export { SocialSharing, SocialSharingNetwork, SocialSharing as default };
