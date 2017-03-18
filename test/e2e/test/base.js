module.exports = {
  base: function (browser) {
    const networks = [
      'Facebook',
      'Google +',
      'LinkedIn',
      'Pinterest',
      'Reddit',
      'Twitter',
      'VKontakte',
      'Weibo',
      'Whatsapp'
    ];

    browser.url('http://localhost:8080/examples/vue2-example.html');

    networks.forEach((network) => {
      browser.assert.containsText('#app', network);
    });

    browser.end();
  }
};
