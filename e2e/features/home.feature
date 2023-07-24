Feature: Work Order

Background: When we navigate to home page
    Given I am on the home page
    When The header is displayed

Scenario:Verify the title of the application
    Then The title is "Dynaway Homework"


Scenario Outline: Verify that when user clicks on any order in home page, Location, Warranty, Model, Maintanance field and values are displayed
Given User clicks on any of the record in home page
When Details page has Location, Warranty, Maintanance Notes and Model fields
Then Location value should be <Location>, Warranty value should be <Warranty>, Model value should be <Model> and Maintanance should be <Maintanance>

Examples:
 | Location               | Warranty               | Model          |Maintanance|
  | Copenhagen office     | 1 month(s) remaining  | Octavia Model  |Requires oil change every 10,000 miles.|



Scenario: Verify that in home page for every order location, id and name fields are available
Given Work orders are displayed in home page
Then Every work order should have location, id and name fields