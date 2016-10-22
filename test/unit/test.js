import SocialSharing from '../../src/social-sharing';

describe('SocialSharing', () => {
  // Inspect the raw component options
  it('has a ready method', () => {
    expect(typeof SocialSharing.ready).toBe('function');
  });

  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof SocialSharing.data).toBe('function');
    const defaultData = SocialSharing.data();
    expect(typeof defaultData.networks).toBe('object');
  });
});
