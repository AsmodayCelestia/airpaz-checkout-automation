Feature: Checkout process on Saucedemo
  As a user of the Saucedemo platform
  User wants to complete a purchase
  So that the user can successfully order items from the site

  Background:
    Given User is logged in to the Saucedemo site with valid credentials
    And User has added items to the shopping cart
    And User is on the checkout page

  Scenario: Successful checkout with valid information
    When User fills in personal information
    And User continues to the next step
    And User finishes the checkout
    Then User should see a confirmation message indicating the order was successful

  Scenario: Checkout with empty fields
    When User proceeds without entering any personal information
    Then User should see validation messages asking to complete the form

  Scenario: Cancel checkout before completing
    When User clicks the cancel button on the checkout page
    Then User should be redirected back to the cart page

  Scenario: Attempting to checkout without any items in the cart
    Given User is logged in to the Saucedemo site with valid credentials
    And User is on the inventory page
    When User goes directly to the cart without adding any items
    And User attempts to checkout
    Then User should not be able to proceed to the checkout information page

  Scenario: [BUG] System allows completing checkout with empty cart
    Given User logs in and navigates to cart without adding items
    When User proceeds through the checkout steps with valid data
    Then User sees a success message despite having no items in the cart