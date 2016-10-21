function verifySharePopup (expectedUrl) {
  return function (result) {
    var newWindow = result.value[1];

    this.verify.equal(result.value.length, 2, 'There should be an open window popup');
    this.switchWindow(newWindow);
    this.verify.urlContains(expectedUrl);
  };
}

module.exports = {
  'share on facebook': function (browser) {
    browser
      .url('http://localhost:8080/examples/')
      .click('#facebook')
      .windowHandles(verifySharePopup('https://www.facebook.com/'))
      .end();
  },

  'share on twitter': function (browser) {
    browser
      .url('http://localhost:8080/examples/')
      .click('#twitter')
      .windowHandles(verifySharePopup('https://twitter.com'))
      .end();
  },

  'share on google plus': function (browser) {
    browser
      .url('http://localhost:8080/examples/')
      .click('#google-plus')
      .windowHandles(verifySharePopup('https://plus.google.com'))
      .end();
  },

  'share on pinterest': function (browser) {
    browser
      .url('http://localhost:8080/examples/')
      .click('#pinterest')
      .windowHandles(verifySharePopup('pinterest.com'))
      .end();
  },

  'share on reddit': function (browser) {
    browser
      .url('http://localhost:8080/examples/')
      .click('#reddit')
      .windowHandles(verifySharePopup('https://www.reddit.com'))
      .end();
  },

  'share on linkedin': function (browser) {
    browser
      .url('http://localhost:8080/examples/')
      .click('#linkedin')
      .windowHandles(verifySharePopup('https://www.linkedin.com'))
      .end();
  }
};
