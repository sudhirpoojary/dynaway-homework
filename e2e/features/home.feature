Feature: Home page

  Scenario: As a user, I can see the correct title of the home page

    Given I am on the home page
    And The header is displayed
    Then The title is "Dynaway Homework"
