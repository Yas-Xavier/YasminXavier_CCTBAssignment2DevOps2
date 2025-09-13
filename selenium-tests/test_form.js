const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testForm() {
  // ✅ Add Chrome options for Jenkins/CI
  let options = new chrome.Options();
  options.addArguments('--headless');                // run headless (no GUI)
  options.addArguments('--no-sandbox');              // needed in CI environments
  options.addArguments('--disable-dev-shm-usage');   // avoid /dev/shm space issues
  options.addArguments('--disable-gpu');             // disable GPU
  options.addArguments('--remote-debugging-port=9222');
  options.addArguments(`--user-data-dir=/tmp/chrome-user-data-${Date.now()}`);

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://54.226.35.49/');

    await driver.findElement(By.name('name')).sendKeys('Alice');
    await driver.findElement(By.name('email')).sendKeys('alice@example.com');
    await driver.findElement(By.name('role')).sendKeys('Developer');
    await driver.findElement(By.id('submit')).click();

    await driver.wait(until.elementLocated(By.id('success')), 3000);
    console.log('✅ Test Success');
  } catch (e) {
    console.error('❌ Test Failed', e);
    process.exit(1); // fail the pipeline if test fails
  } finally {
    await driver.quit();
  }
})();
