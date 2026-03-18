Feature: Warehouse Management - Inbound Purchase Orders
  As a warehouse manager
  I want to access the Purchase Orders section in Manhattan WMS
  So that I can manage inbound purchase orders

  Scenario: Login via KROGERping SSO and navigate to Purchase Orders
    Given I navigate to the Manhattan application
    When I click on the Username field
    And I select KROGERping SSO login
    And I enter my EUID credentials
    And I click Continue
    And I enter my password
    And I click Sign In
    Then I should see the dashboard landing page
    When I click on Purchase Orders
    And I dismiss the popup notification
    Then I should see the Purchase Orders page loaded

  Scenario: Normal login flow - Direct login and navigate to Purchase Orders
    Given I navigate to the Manhattan application
    When I enter my username
    And I enter my password
    And I click Log In
    Then I should see the dashboard landing page
    When I click on Purchase Orders
    And I dismiss the popup notification
    And I click on the menu toggle
    And I click on Home
    Then I should see the dashboard landing page

  Scenario: Navigate back to Home from Purchase Orders
    Given I am logged in and on the dashboard
    When I click on Purchase Orders
    And I dismiss the popup notification
    And I click on the menu toggle
    And I click on Home
    Then I should see the dashboard landing page
