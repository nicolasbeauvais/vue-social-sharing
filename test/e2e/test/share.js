function verifySharePopup (expectedUrl) {
  return function (result) {
    var newWindow = result.value[1];

    this.verify.equal(result.value.length, 2, 'There should be an open window popup');
    this.switchWindow(newWindow);
    this.verify.urlContains(expectedUrl);
  };
}

var url = 'http://localhost:8080/examples/vue2-example.html';

module.exports = {
  'share on facebook': function (browser) {
    browser
      .url(url)
      .click('#facebook')
      .windowHandles(verifySharePopup('https://www.facebook.com/'))
      .end();
  },

  'share on twitter': function (browser) {
    browser
      .url(url)
      .click('#twitter')
      .windowHandles(verifySharePopup('https://twitter.com'))
      .end();
  },

  'share on google plus': function (browser) {
    browser
      .url(url)
      .click('#google-plus')
      .windowHandles(verifySharePopup('https://plus.google.com'))
      .end();
  },

  'share on pinterest': function (browser) {
    browser
      .url(url)
      .click('#pinterest')
      .windowHandles(verifySharePopup('pinterest.com'))
      .end();
  },

  'share on reddit': function (browser) {
    browser
      .url(url)
      .click('#reddit')
      .windowHandles(verifySharePopup('https://www.reddit.com'))
      .end();
  },

  'share on linkedin': function (browser) {
    browser
      .url(url)
      .click('#linkedin')
      .windowHandles(verifySharePopup('https://www.linkedin.com'))
      .end();
  }
};
