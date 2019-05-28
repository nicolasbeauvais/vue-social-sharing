import Vue from 'vue';
import SocialSharing, { mockWindow } from '../../src/social-sharing';
import SocialSharingNetwork from '../../src/social-sharing-network';
import Networks from '../../src/networks';

describe('SocialSharing', () => {
  const createComponent = (propsData = {}, attr = {}) => {
    const Comp = Vue.extend({
      template: `
        <social-sharing url="https://vuejs.org/" title="The Progressive JavaScript Framework"
                 description="Intuitive, Fast and Composable MVVM for building interactive interfaces." inline-template>
          <div class="networks">
            <network network="email" id="email">
              <i class="fa fa-envelope"></i> Email
            </network>
            <network network="facebook" id="facebook">
              <i class="fa fa-facebook"></i> Facebook
            </network>
            <network network="googleplus" id="googleplus">
              <i class="fa fa-google-plus"></i> Google +
            </network>
            <network network="line" id="line">
              <i class="fa fa-line"></i> Line
            </network>
            <network network="linkedin" id="linkedin" class="test-class">
              <i class="fa fa-linkedin"></i> LinkedIn
            </network>
            <network network="odnoklassniki" id="odnoklassniki">
              <i class="fa fa-odnoklassniki"></i> Odnoklassniki
            </network>
            <network network="pinterest" id="pinterest">
              <i class="fa fa-pinterest"></i> Pinterest
            </network>
            <network network="reddit" id="reddit">
              <i class="fa fa-reddit"></i> Reddit
            </network>
            <network network="skype" id="skype">
              <i class="fa fa-skype"></i> Skype
            </network>
            <network network="telegram" id="telegram">
              <i class="fa fa-telegram"></i> Telegram
            </network>
            <network network="twitter" id="twitter">
              <i class="fa fa-twitter"></i> Twitter
            </network>
            <network network="viber" id="viber">
              <i class="fa fa-phone-square"></i> Viber
            </network>
            <network network="vk" id="vk">
              <i class="fa fa-vk"></i> VKontakte
            </network>
            <network network="weibo" id="weibo">
              <i class="fa fa-weibo"></i> Weibo
            </network> 
            <network network="whatsapp" id="whatsapp" style="color:#f00;">
              <i class="fa fa-whatsapp"></i> Whatsapp
            </network>
          </div>
        </social-sharing>
      `,
      components: {
        SocialSharing
      }
    });

    return new Comp({
      propsData,
      data () {
        return {
          attr
        };
      }
    }).$mount();
  };

  // Inspect the raw component options
  it('has a mounted method', () => {
    expect(typeof SocialSharing.mounted).toBe('function');
  });

  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof SocialSharing.data).toBe('function');
    const defaultData = SocialSharing.data();
    expect(defaultData.baseNetworks).toBe(Networks);
  });

  // Calculates correct position of popup
  it('calculates correct popup position', (done) => {
    mockWindow({
      screen: {
        width: 1000,
        height: 700
      },
      innerWidth: 1000,
      innerHeight: 700,
      location: {
        href: window.location.href
      },
      screenLeft: 0,
      screenTop: 0
    });

    const vm = createComponent();
    Vue.nextTick(() => {
      const popup = vm.$children[0].popup;

      // default width popup = 626
      // default height popup = 436

      expect(popup.left).toBe(187); // 1000 / 2 - 626 / 2 = 187
      expect(popup.top).toBe(132); // 700 / 2 - 436 / 2 = 132
      done();
    });
  });

  it('all components are links', () => {
    [].forEach.call(createComponent().$el.querySelectorAll('.networks > a'), function (node, index) {
      expect(node.tagName).toBe('A');
    });
  });

  it('create style attributes', () => {
    expect(createComponent().$children[0].$el.querySelector('#whatsapp').style.color).toBe('rgb(255, 0, 0)');
  });

  it('create class attributes', () => {
    expect(createComponent().$children[0].$el.querySelector('#linkedin').className).toBe('test-class');
  });

  it('should render sharing links correctly', () => {
    const expectedShareNames = [
      'email',
      'facebook',
      'googleplus',
      'line',
      'linkedin',
      'odnoklassniki',
      'pinterest',
      'reddit',
      'skype',
      'telegram',
      'twitter',
      'whatsapp'
    ];

    [].forEach.call(createComponent().$el.querySelectorAll('.network'), function (node, index) {
      if (expectedShareNames[index] === 'whatsapp') {
        expect(node.href).toContain('whatsapp://');
      } else {
        expect(node.href.split('#')[1]).toBe(`share-${expectedShareNames[index]}`);
      }
    });
  });

  it('has a full list of networks', () => {
    for (var network in Networks) {
      const expectedType = ['email', 'sms', 'sms_ios', 'viber'].indexOf(network) > -1 ? 'direct' : 'popup';

      expect(typeof Networks[network].sharer).toBe('string');
      expect(Networks[network].type).toBe(expectedType);
    }
  });

  it('setup a network correctly', () => {
    expect(typeof SocialSharingNetwork.props).toBe('object');
    expect(SocialSharingNetwork.functional).toBe(true);
  });

  it('it create a popup', () => {
    const vm = createComponent();
    const network = Object.keys(Networks)[0];

    vm.$on('social_shares_open', (sharedNetwork, url) => {
      expect(sharedNetwork).toBe(network);
      expect(url).toBe('https://vuejs.org/');
    });

    vm.$children[0].share(network);
  });
});
