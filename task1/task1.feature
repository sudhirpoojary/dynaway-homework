Feature: Create Order

Background: User logs into application
    Given User navigates to the application
    When User logs into application
    Then Home page should be displayed


@Smoke @Regression
Scenario Outline: Verify that user is able to create a work order by entering all the details
    Given User clicks on Create Order
    When User enters all the fields in create order form and clicks on Save <WorkOrderType>, <ResponsibleGroup>, <ServiceLevell>, <StandardDescription>,<WorkOrderDescription>,<Description>,<JobType>,<Varient>,<Trade>
    Then Order should be created with OrderID

Examples:
 | WorkOrderType  | ResponsibleGroup | ServiceLevell |StandardDescription|WorkOrderDescription|Description|JobType|Varient|Trade|
 |   Corrective   |                  |               |                   |                    |            |Repair|       |    |


@Regression
Scenario Outline: Verify that user is not able  to create a work order when mandatory fields are not entered
    Given User clicks on Create Order
    When User enters all the fields in create order form and clicks on Save <WorkOrderType>, <ResponsibleGroup>, <ServiceLevell>, <StandardDescription>,<WorkOrderDescription>,<Description>,<JobType>,<Varient>,<Trade>
    Then Error message should be displayed

Examples:
 | WorkOrderType  | ResponsibleGroup | ServiceLevell |StandardDescription|WorkOrderDescription|Description|JobType|Varient|Trade|
 |                |                  |               |                   |                    |            |      |       |    |


@Regression
Scenario Outline: Verify that user is not able  to create a work order when more than 60 characteres are entered in Description
    Given User clicks on Create Order
    When User enters all the fields in create order form and clicks on Save <WorkOrderType>, <ResponsibleGroup>, <ServiceLevell>, <StandardDescription>,<WorkOrderDescription>,<Description>,<JobType>,<Varient>,<Trade>
    Then Error message should be displayed

Examples:
 | WorkOrderType  | ResponsibleGroup | ServiceLevell |StandardDescription|WorkOrderDescription|Description                     |JobType|Varient|Trade|
 | Corrective     |                  |               |                   |                    |   60 Chars description         |Repair|       |    |


