module.exports = {
  base: function (browser) {
    const networks = [
      'Facebook',
      'Google +',
      'LinkedIn',
      'Pinterest',
      'Reddit',
      'Twitter',
      'Viber',
      'VKontakte',
      'Weibo',
      'Whatsapp',
      'Telegram',
      'Line',
      'Skype'
    ];

    browser.url('http://localhost:8080/examples/vue2-example.html');

    networks.forEach((network) => {
      browser.assert.containsText('#app', network);
    });

    browser.end();
  }
};
