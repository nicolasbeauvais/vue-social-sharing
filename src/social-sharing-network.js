import Networks from './networks.json';

export default {
  functional: true,

  props: {
    network: {
      type: String,
      default: ''
    }
  },

  render (createElement, context) {
    const network = Networks[context.props.network];

    return createElement(context.parent.networkTag, {
      class: context.data.staticClass || null,
      style: context.data.staticStyle || null,
      attrs: {
        id: context.data.attrs.id || null,
        'data-link': network.type === 'popup'
          ? '#share-' + context.props.network
          : context.parent._getSharer(context.props.network),
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
