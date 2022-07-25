import { createLocalVue, mount } from '@vue/test-utils'
import VueSocialSharing from './../src/vue-social-sharing'
import ShareNetwork, { mockWindow } from './../src/share-network'
import AvailableNetworks from '../src/networks'

const customNetworks = {
  fakeblock: 'https://fakeblock.com/share?url=@url&title=@title'
}
const fakeWindow = {
  location: {
    href: 'https://test.com'
  },
  screen: {
    width: 1000,
    height: 700,
    availWidth: 1000
  },
  innerWidth: 1000,
  innerHeight: 700,
  screenLeft: 0,
  screenTop: 0
}

const localVue = createLocalVue()
localVue.use(VueSocialSharing, { networks: customNetworks })
const CompWithProps = {
  props: ['foo'],
  render: function () {
    return '<span>' + this.foo + '</span>'
  }
}

localVue.component('comp-with-props', CompWithProps)

function mountShareNetwork (data = {}) {
  if (!data.propsData) {
    data.propsData = {
      network: 'facebook',
      url: 'http://vuejs.org/',
      title: 'The Progressive JavaScript Framework'
    }
  }

  if (!data.attrs) data.attrs = {}

  return mount(ShareNetwork, {
    propsData: data.propsData,
    attrs: data.attrs,
    localVue
  })
}

describe('SocialSharing', () => {
  it('has an install method', () => {
    expect(typeof VueSocialSharing.install).toBe('function')
  })

  it('sets global Vue property', () => {
    expect(typeof localVue.prototype.$SocialSharing).toBe('object')
  })

  it('sets instance Vue property', () => {
    expect(typeof mountShareNetwork().vm.$SocialSharing).toBe('object')
  })

  it('sets list of networks in global vue property', () => {
    expect(localVue.prototype.$SocialSharing.options.networks).toMatchObject({
      ...AvailableNetworks,
      ...customNetworks
    })
  })

  it('sets list of networks in instance vue property', () => {
    expect(mountShareNetwork().vm.$SocialSharing.options.networks).toMatchObject({
      ...AvailableNetworks,
      ...customNetworks
    })
  })

  // Calculates correct position of popup
  it('calculates correct popup position', () => {
    mockWindow(fakeWindow)

    const vm = mountShareNetwork().vm

    vm.resizePopup()

    // default width popup = 626
    // default height popup = 436

    expect(vm.popupLeft).toBe(187) // 1000 / 2 - 626 / 2 = 187
    expect(vm.popupTop).toBe(132) // 700 / 2 - 436 / 2 = 132
  })

  // Sets correct popup size
  it('sets correct popup size', () => {
    const vm = mountShareNetwork({
      propsData: {
        network: 'facebook',
        url: 'http://vuejs.org/',
        title: 'The Progressive JavaScript Framework',
        popup: {
          height: 100,
          width: 100
        }
      }
    }).vm

    expect(vm.popup.height).toBe(100)
    expect(vm.popup.width).toBe(100)
    expect(vm.popupTop).toBe(0)
  })

  it('create component with a link tag', () => {
    expect(mountShareNetwork().get('a'))
  })

  it('can have attributes', () => {
    const shareNetwork = mountShareNetwork({ attrs: { style: 'test' }})
    expect(shareNetwork.attributes().style).toBe('test')
  })

  it('can pass props to custom element', () => {
    const shareNetwork = mountShareNetwork({
      propsData: {
        tag: 'comp-with-props',
        network: 'facebook',
        url: 'http://vuejs.org/',
        title: 'The Progressive JavaScript Framework',
        foo: 'bar'
      }
    })

    expect(shareNetwork.findComponent(CompWithProps).props('foo')).toBe('bar')
  })

  it('has default class', () => {
    expect(mountShareNetwork().get('.share-network-facebook'))
  })

  it('compute the correct network', () => {
    for (const network in localVue.prototype.$SocialSharing.options.networks) {
      const component = mountShareNetwork({
        propsData: {
          network,
          url: 'http://vuejs.org/',
          title: 'The Progressive JavaScript Framework'
        }
      })
      expect(component.vm.rawLink).toBe(localVue.prototype.$SocialSharing.options.networks[network])
    }
  })

  it('compute the correct sharing link', () => {
    for (const network in localVue.prototype.$SocialSharing.options.networks) {
      if (network === 'sms_ios') return

      const component = mountShareNetwork({
        propsData: {
          network,
          url: 'http://vuejs.org/',
          title: 'The Progressive JavaScript Framework'
        }
      })
      const rawLink = localVue.prototype.$SocialSharing.options.networks[network]
      const url = component.vm.shareLink.substr(0, component.vm.shareLink.indexOf('?'))

      expect(url).toBe(rawLink.substr(0, rawLink.indexOf('?')))
    }
  })

  it('it create a popup', () => {
    const shareNetwork = mountShareNetwork()
    let popupCreated = false

    mockWindow({
      ...fakeWindow,
      open: (url, sharer) => {
        expect(url).toBe(shareNetwork.vm.shareLink)
        expect(sharer).toBe('sharer-facebook')

        popupCreated = true

        return {
          focus: () => {},
          closed: false
        }
      }
    })

    shareNetwork.vm.$on('share_network_open', (network, url) => {
      expect(network).toBe(localVue.prototype.$SocialSharing.options.networks['facebook'])
      expect(url).toBe('https://vuejs.org/')
    })

    shareNetwork.vm.share()

    expect(popupCreated).toBe(true)
  })
})
