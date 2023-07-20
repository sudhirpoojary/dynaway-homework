# Dynaway Homework
This is a small demo of an Angular & Ionic application 

**In case you need help or have any comments feel free to reach out to us at kacan@dynaway.com**

Follow the instructions in the next section to get your project set up properly. 
Creating a commit for each of the tasks is suggested. 
Get back to us once you're confident with your code and remember - 
it is the quality of your code and the way you approach the problems that matter the most, not whether you've completed the tasks and how fast! 😉

## Getting started
0. Fork the repository
1. Make sure you have [Node.js](https://nodejs.org/en/) (v16+) and [npm](https://www.npmjs.com/) installed. If not, follow the links and find the installation instructions
2. Install the [Angular CLI](https://cli.angular.io/) and [Ionic CLI](https://ionicframework.com/docs/cli) globally by executing
   `npm install -g @angular/cli` and `npm install -g @ionic/cli` in your terminal
3. Clone or download your forked project (`git@github.com:<your_username>/dynaway-homework.git`) and go to the project folder (`cd dynaway-homework`)
4. Install all dependencies with `npm install`
5. Run `npm run start`. Your app should be now up and running on [localhost:4200](http://localhost:4200)!

## Test Automation Task:
As a test automation engineer, you will be responsible for creating scenarios using Gherkin syntax and then writing automated tests for them 
using WebdriverIO and Cucumber. 

Your task will be to write such a scenario and then implement an automated test based on it.
The scenario should cover a specific functionality of the application included in this project. 
Follow the steps below to complete the task:

1. After successfully running the application included in this project as described above,
identify a specific functionality to test.
2. Create a new feature file with an appropriate name under the `e2e/features` directory. For example, `my_feature.feature`.
3. Write a Gherkin scenario in the feature file that describes the expected behavior of the chosen functionality. 
Use Given-When-Then format to define the steps.
4. Create a new step definition file under the `e2e/steps` directory. For example, `my_feature.steps.ts`.
5. Implement the step definitions for each step of the scenario in the step definition file. Use WebdriverIO to interact with the application and validate the expected behavior.
6. You can (but not mandatory) use 'chai' library to validate assertions, as demonstrted in the example.
7. Run the test using the provided `npm run e2e` command. Make sure the test runs successfully and validates the expected behavior of the chosen functionality.

Feel free to reach out if you have any further questions or need additional assistance! 
Especially if you are having trouble running the project or the tests.

# Helpful Links

- [Webdriver.IO](https://webdriver.io/)
- [Gherkin](https://cucumber.io/docs/gherkin/reference/)
