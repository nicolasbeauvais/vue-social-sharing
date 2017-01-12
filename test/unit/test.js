import Vue from 'vue';
import SocialSharing, { mockWindow } from '../../src/social-sharing';
import SocialSharingMixin from '../../src/social-sharing-mixin';

describe('SocialSharing', () => {
  const createComponent = (propsData = {}, attr = {}, mixins = SocialSharingMixin.popup) => {
    const Ctor = Vue.extend({
      template: `
        <social-sharing
          inline-template>
          <div class="icons">
            <facebook class="icon">
              <i class="fa fa-facebook"></i>
            </facebook>
            <twitter class="icon">
              <i class="fa fa-twitter"></i>
              </twitter>
            <linkedin class="icon">
              <i class="fa fa-linkedin"></i>
            </linkedin>
          </div>
        </social-sharing>
      `,
      mixins: [mixins],
      components: {
        SocialSharing
      }
    });

    return new Ctor({
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
    expect(typeof defaultData.networks).toBe('object');
  });

  // Calculates correct position of popup
  it('calculates correct popup position', (done) => {
    mockWindow({
      screen: {
        width: 1000,
        height: 700
      },
      location: {
        href: window.location.href
      }
    });

    const comp = new Vue({
      el: document.createElement('div'),
      render: (h) => h(SocialSharing)
    });

    Vue.nextTick(() => {
      // console.log('data', comp);
      const popup = comp.$children[0].popup;
      // default width popup = 626
      // default height popup = 436
      expect(popup.left).toBe(177); // 1000 /2 - ((626/2) + 10) = 177
      expect(popup.top).toBe(82); // 700 / 2 - ((436/2) + 50) = 82
      done();
    });
  });

  xit('should get correct sharer url', () => {
  });

  xit('should open popup', () => {
  });

  xit('should set component aliases correctly', () => {
    // const vm = createComponent();
    // console.log(vm.components, vm.facebook);
  });

  // mixin tests
  xit('should render sharing links correctly', () => {
    // not working in travis-ci yet
    const expectedShareNames = [
      'facebook',
      'twitter',
      'linkedin'
    ];

    const vm = createComponent();
    const iconLinks = vm.$el.querySelectorAll('.icon');

    iconLinks.forEach((link, index) => {
      expect(link.href.split('#')[1]).toBe(`share-${expectedShareNames[index]}`); // split to remove http://domain.com/#share-twitter
    });
  });

  xit('should get attribute by key', (done) => {
    // not working yet --> attributes not defined
    const attr = {
      'data-action': 'doSomething'
    };
    const propsData = {};
    const propKeys = Object.keys(attr);
    const vm = createComponent(propsData, attr);

    Vue.nextTick(() => {
      console.log('test', vm);
      propKeys.forEach((key) => {
        expect(vm.attributes(key)).toBe(attr[key]);
      });
      done();
    });
  });
});
