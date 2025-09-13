cat > test_validation.js <<'EOF'
require('chromedriver');
const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const TESTING_URL = process.env.TESTING_URL || 'http://<TESTING-IP>/';

(async function testValidation() {
  const options = new chrome.Options();
  options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1280,1024');

  let driver;
  try {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    console.log('Opening', TESTING_URL);
    await driver.get(TESTING_URL);

    await driver.findElement(By.name('name')).sendKeys('Bob');
    // email left empty
    await driver.findElement(By.name('role')).sendKeys('Tester');
    await driver.findElement(By.id('submit')).click();

    // Wait for an alert (your main.js calls alert('All fields are required'))
    await driver.wait(until.alertIsPresent(), 4000);
    const alert = await driver.switchTo().alert();
    const text = await alert.getText();
    console.log('Alert text:', text);
    await alert.accept();

    console.log('Validation test OK');
    await driver.quit();
    process.exit(0);
  } catch (e) {
    console.error('Validation Test Failed:', e);
    if (driver) await driver.quit();
    process.exit(1);
  }
})();
EOF
