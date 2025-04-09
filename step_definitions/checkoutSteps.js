const { Given, When, Then, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { getDriver, closeDriver, By, until } = require('../support/driver');

let driver;

BeforeAll(async () => {
  driver = await getDriver();
});

AfterAll(async () => {
  await closeDriver();
});

Given('User is logged in to the Saucedemo site with valid credentials', async () => {
    await driver.get('https://www.saucedemo.com/');
    await driver.wait(until.elementLocated(By.id('user-name')), 5000);
  
    const usernameInput = await driver.findElement(By.id('user-name'));
    const passwordInput = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.id('login-button'));
  
    await usernameInput.sendKeys('standard_user');
    await passwordInput.sendKeys('secret_sauce');
    await loginButton.click();
  
    await driver.wait(until.urlContains('inventory'), 5000);
  });
  
Given('User has added items to the shopping cart', async () => {
  const addToCartBtn = await driver.findElement(By.css('.inventory_item button'));
  await addToCartBtn.click();

  const cartIcon = await driver.findElement(By.className('shopping_cart_link'));
  await cartIcon.click();

  await driver.wait(until.urlContains('cart'), 5000);
});
Given('User is on the checkout page', async () => {
  const checkoutButton = await driver.findElement(By.id('checkout'));
  await checkoutButton.click();

  await driver.wait(until.urlContains('checkout-step-one'), 5000);
});
When('User fills in personal information', async () => {
  const firstNameInput = await driver.findElement(By.id('first-name'));
  const lastNameInput = await driver.findElement(By.id('last-name'));
  const postalCodeInput = await driver.findElement(By.id('postal-code'));

  await driver.executeScript("arguments[0].scrollIntoView(true);", firstNameInput);
  await driver.wait(until.elementIsVisible(firstNameInput), 10000);

  await firstNameInput.sendKeys('Heru');
  await lastNameInput.sendKeys('Bagus');
  await postalCodeInput.sendKeys('12345');
});
When('User continues to the next step', async () => {
  const continueBtn = await driver.findElement(By.id('continue'));
  await continueBtn.click();

  await driver.wait(until.urlContains('checkout-step-two'), 5000);
});
When('User finishes the checkout', async () => {
  const finishBtn = await driver.findElement(By.id('finish'));
  await finishBtn.click();

  await driver.wait(until.urlContains('checkout-complete'), 5000);
});
Then('User should see a confirmation message indicating the order was successful', async () => {
  const confirmationHeader = await driver.findElement(By.className('complete-header'));
  const text = await confirmationHeader.getText();

  if (!text.includes('Thank you for your order')) {
    throw new Error('Confirmation message not found');
  }
});


When('User proceeds without entering any personal information', async () => {
    const continueBtn = await driver.findElement(By.id('continue'));
    await continueBtn.click();
  });
  Then('User should see validation messages asking to complete the form', async () => {
    const errorMsg = await driver.findElement(By.css('.error-message-container'));
    const isDisplayed = await errorMsg.isDisplayed();
    if (!isDisplayed) throw new Error('Expected validation error to be visible');
  });
  

  When('User clicks the cancel button on the checkout page', async () => {
    const cancelBtn = await driver.findElement(By.id('cancel'));
    await cancelBtn.click();
  });
  Then('User should be redirected back to the cart page', async () => {
    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('/cart.html')) {
      throw new Error(`Expected to be on cart page but got ${currentUrl}`);
    }
  });
  

  Given('User is on the inventory page', async () => {
    await driver.get('https://www.saucedemo.com/inventory.html');
  });
  When('User goes directly to the cart without adding any items', async () => {
    const cartIcon = await driver.findElement(By.className('shopping_cart_link'));
    await cartIcon.click();
    await driver.wait(until.urlContains('cart'), 5000);
  });
  When('User attempts to checkout', async () => {
    const checkoutBtn = await driver.findElement(By.id('checkout'));
    await checkoutBtn.click();
  });
  Then('User should not be able to proceed to the checkout information page', async () => {
    const currentUrl = await driver.getCurrentUrl();
    if (!currentUrl.includes('checkout-step-one')) {
      return; 
    }
    const firstNameInput = await driver.findElement(By.id('first-name'));
    const value = await firstNameInput.getAttribute('value');
    if (value === '') {
      throw new Error('Checkout page loaded unexpectedly without items in cart');
    }
  });


  Given('User logs in and navigates to cart without adding items', async () => {
    await driver.get('https://www.saucedemo.com/');
    const usernameInput = await driver.findElement(By.id('user-name'));
    const passwordInput = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.id('login-button'));
    await usernameInput.sendKeys('standard_user');
    await passwordInput.sendKeys('secret_sauce');
    await loginButton.click();
    await driver.wait(until.urlContains('inventory'), 5000);
    const cartIcon = await driver.findElement(By.className('shopping_cart_link'));
    await cartIcon.click();
    await driver.wait(until.urlContains('cart'), 5000);
  });
  When('User proceeds through the checkout steps with valid data', async () => {
    const checkoutBtn = await driver.findElement(By.id('checkout'));
    await checkoutBtn.click();
    await driver.wait(until.urlContains('checkout-step-one'), 5000);
    const firstNameInput = await driver.wait(
      until.elementLocated(By.id('first-name')),
      5000
    );
    await driver.wait(until.elementIsVisible(firstNameInput), 5000);
    const lastNameInput = await driver.findElement(By.id('last-name'));
    const postalCodeInput = await driver.findElement(By.id('postal-code'));
    await firstNameInput.sendKeys('Bug');
    await lastNameInput.sendKeys('Hunter');
    await postalCodeInput.sendKeys('00000');
    const continueBtn = await driver.findElement(By.id('continue'));
    await continueBtn.click();
    await driver.wait(until.urlContains('checkout-step-two'), 5000);
    const finishBtn = await driver.findElement(By.id('finish'));
    await finishBtn.click();
    await driver.wait(until.urlContains('checkout-complete'), 5000);
  });
  Then('User sees a success message despite having no items in the cart', async () => {
    const confirmationHeader = await driver.findElement(By.className('complete-header'));
    const text = await confirmationHeader.getText();
  
    if (!text.includes('Thank you for your order')) {
      throw new Error('Expected success message not found');
    }
  });
  
  