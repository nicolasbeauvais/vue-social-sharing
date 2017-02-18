import Vue from 'vue';
import SocialSharing, { mockWindow } from '../../src/social-sharing';
import SocialSharingMixin from '../../src/social-sharing-mixin';

describe('SocialSharing', () => {
  const createComponent = (propsData = {}, attr = {}, mixins = SocialSharingMixin.popup) => {
    const Ctor = Vue.extend({
      template: `
        <social-sharing url="https://vuejs.org/" title="The Progressive JavaScript Framework"
                 description="Intuitive, Fast and Composable MVVM for building interactive interfaces." inline-template>
          <div class="networks">
            <facebook id="facebook" class="network">
              <i class="fa fa-facebook"></i> Facebook
            </facebook>
            <twitter id="twitter" class="network">
              <i class="fa fa-twitter"></i> Twitter
            </twitter>
            <googleplus id="google-plus" class="network">
              <i class="fa fa-google-plus"></i> Google +
            </googleplus>
            <pinterest id="pinterest" class="network">
              <i class="fa fa-pinterest"></i> Pinterest
            </pinterest>
            <reddit id="reddit" class="network">
              <i class="fa fa-reddit"></i> Reddit
            </reddit>
            <linkedin id="linkedin" class="network">
              <i class="fa fa-linkedin"></i> LinkedIn
            </linkedin>
            <whatsapp id="whatsapp" class="network">
              <i class="fa fa-whatsapp"></i> Whatsapp
            </whatsapp>
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

    const vm = createComponent();

    Vue.nextTick(() => {
      const popup = vm.$children[0].popup;

      // default width popup = 626
      // default height popup = 436

      expect(popup.left).toBe(177); // 1000 /2 - ((626/2) + 10) = 177
      expect(popup.top).toBe(82); // 700 / 2 - ((436/2) + 50) = 82
      done();
    });
  });

  it('all components are links', () => {
    const vm = createComponent().$children[0];

    for (var children in vm.$children) {
      expect(vm.$children[children].$el.tagName).toBe('A');
    }
  });

  // mixin tests
  it('should render sharing links correctly', () => {
    // not working in travis-ci yet
    const expectedShareNames = [
      'facebook',
      'twitter',
      'googleplus',
      'pinterest',
      'reddit',
      'linkedin',
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
});
