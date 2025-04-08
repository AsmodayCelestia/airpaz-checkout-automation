const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver;

async function getDriver() {
  if (!driver) {
    const options = new chrome.Options();
    options.addArguments('--incognito'); 

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }
  return driver;
}

async function closeDriver() {
  if (driver) {
    await driver.quit();
    driver = null;
  }
}

module.exports = { getDriver, closeDriver, By, until };
