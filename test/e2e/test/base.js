module.exports = {
  base: function (browser) {
    browser
      .url('http://localhost:8080/examples/vue2-example.html')
      .assert.containsText('#app', 'Facebook')
      .assert.containsText('#app', 'Twitter')
      .assert.containsText('#app', 'Google +')
      .assert.containsText('#app', 'Pinterest')
      .assert.containsText('#app', 'Reddit')
      .assert.containsText('#app', 'LinkedIn')
      .assert.containsText('#app', 'Whatsapp')
      .end();
  }
};
