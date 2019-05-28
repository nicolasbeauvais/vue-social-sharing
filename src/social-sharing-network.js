export default {
  functional: true,

  props: {
    network: {
      type: String,
      default: ''
    }
  },

  render: (createElement, context) => {
    const network = context.parent._data.baseNetworks[context.props.network];

    if (!network) {
      return console.warn(`Network ${context.props.network} does not exist`);
    }

    return createElement(context.parent.networkTag, {
      staticClass: context.data.staticClass || null,
      staticStyle: context.data.staticStyle || null,
      class: context.data.class || null,
      style: context.data.style || null,
      attrs: {
        id: context.data.attrs.id || null,
        tabindex: context.data.attrs.tabindex || 0,
        'data-link': network.type === 'popup'
          ? '#share-' + context.props.network
          : context.parent.createSharingUrl(context.props.network),
        'data-action': network.type === 'popup' ? null : network.action
      },
      on: {
        click: network.type === 'popup' ? () => {
          context.parent.share(context.props.network);
        } : () => {
          context.parent.touch(context.props.network);
        }
      }
    }, context.children);
  }
};
