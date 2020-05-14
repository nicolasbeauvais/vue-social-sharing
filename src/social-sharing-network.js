import BaseNetworks from './networks.json';

const warnNoParent = () => console.warn('SocialSharingNetwork should be child of SocialSharing');

const SocialSharingNetwork = {
  name: 'SocialSharingNetwork',
  props: {
    network: {
      type: String,
      default: ''
    }
  },

  inject: {
    'networks': {
      default: Object.assign({}, BaseNetworks)
    },

    'tag': {
      default: 'a'
    },
    'createSharingUrl': {
      default: warnNoParent
    },
    'share': {
      default: warnNoParent
    },
    'touch': {
      default: warnNoParent
    }
  },
  render (createElement) {
    const network = this.networks[this.network];

    if (!network) {
      console.warn(`Network ${this.network} does not exist`);
      return createElement(this.tag);
    }
    const attrs = {
      'data-link': network.type === 'popup'
        ? '#share-' + this.network
        : this.createSharingUrl(this.network),
      'data-action': network.type === 'popup' ? null : network.action
    };
    if (this.tag === 'a') {
      attrs.href = this.createSharingUrl(this.network);
    }
    return createElement(this.tag, {
      attrs,
      on: {
        click: (event) => {
          event.preventDefault();
          if (network.type === 'popup') {
            this.share(this.network);
          } else {
            this.touch(this.network);
          }
        }
      }
    }, this.$slots.default);
  }
};

export default SocialSharingNetwork;
