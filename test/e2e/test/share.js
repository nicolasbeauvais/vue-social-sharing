const Networks = require('./../../../src/networks.json');
const url = require('url');

function verifySharePopup (expectedUrl) {
  return function (result) {
    console.log(result);
    var newWindow = result.value[1];

    this.verify.equal(result.value.length, 2, 'There should be an open window popup');
    this.switchWindow(newWindow);
    this.waitForElementVisible('body', 5000);

    if (expectedUrl !== 'linkedin.com') {
      this.verify.urlContains(expectedUrl);
    }
  };
}

const Tests = {};

for (const network in Networks) {
  if (Networks[network].type === 'direct' || network === 'googleplus') {
    continue;
  }

  const parsedUrl = url.parse(Networks[network].sharer);

  Tests[`share on ${network}`] = function (browser) {
    const elementId = `#${network}`;
    browser = browser
      .url('http://localhost:8080/examples/vue2-example.html')
      .waitForElementVisible('#app', 1000);
    browser.expect.element(elementId).to.be.an('a');
    browser.assert.visible('a' + elementId);
    browser.click(elementId, () => {
      console.log('element clicked');
    })
    .windowHandles(verifySharePopup(`${parsedUrl.hostname}`.replace('www.', '')))
    .end();
  };
}

module.exports = Tests;
