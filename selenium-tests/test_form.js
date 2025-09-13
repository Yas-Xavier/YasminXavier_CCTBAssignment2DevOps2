const {Builder, By, until} = require('selenium-webdriver');

(async function testForm() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://54.226.35.49/');
    await driver.findElement(By.name('name')).sendKeys('Alice');
    await driver.findElement(By.name('email')).sendKeys('alice@example.com');
    await driver.findElement(By.name('role')).sendKeys('Developer');
    await driver.findElement(By.id('submit')).click();

    await driver.wait(until.elementLocated(By.id('success')), 3000);
    console.log('Test Success');
  } catch (e) {
    console.log('Test Failed', e);
  } finally {
    await driver.quit();
  }
})();

