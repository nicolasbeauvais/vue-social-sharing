import { createApp } from 'vue'
import { mount } from '@vue/test-utils'
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

const localVue = createApp({})
localVue.use(VueSocialSharing)

function mountShareNetwork (data = {}) {
  if (!data.propsData) {
    data.propsData = {
      network: 'facebook',
      url: 'http://vuejs.org/',
      title: 'The Progressive JavaScript Framework',
      options: {
        networks: customNetworks
      }
    }
  }

  if (!data.attrs) data.attrs = {}

  return mount(ShareNetwork, {
    propsData: data.propsData,
    attrs: data.attrs,
    localVue,
    global: {
      provide: {
        'shareNetworkOptions': {
          networks: customNetworks
        }
      }
    }
  })
}

describe('SocialSharing', () => {
  it('has an install method', () => {
    expect(typeof VueSocialSharing.install).toBe('function')
  })

  it('sets instance options property', () => {
    expect(mountShareNetwork().componentVM.options.networks).toMatchObject(customNetworks)
  })

  it('sets list of networks in instance vue property', () => {
    expect(mountShareNetwork().componentVM.networks).toMatchObject({
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

  it('has default class', () => {
    expect(mountShareNetwork().get('.share-network-facebook'))
  })

  it('compute the correct network', () => {
    for (const network in AvailableNetworks) {
      const component = mountShareNetwork({
        propsData: {
          network,
          url: 'http://vuejs.org/',
          title: 'The Progressive JavaScript Framework'
        }
      })
      expect(component.vm.rawLink).toBe(AvailableNetworks[network])
    }
  })

  it('compute the correct sharing link', () => {
    for (const network in AvailableNetworks) {
      if (network === 'sms_ios') return

      const component = mountShareNetwork({
        propsData: {
          network,
          url: 'http://vuejs.org/',
          title: 'The Progressive JavaScript Framework'
        }
      })
      const rawLink = AvailableNetworks[network]
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

    shareNetwork.vm.share()

    expect(popupCreated).toBe(true)
  })
})
