import { Given, When, Then } from '@cucumber/cucumber'
import { expect }  from 'chai'

Given(/^I am on the home page$/, async () => {
    await browser.url('/home')
})

Given(/^The header is displayed$/, async () =>  {
    const headerElement = await $('app-home > ion-header')
    await headerElement.waitForDisplayed()
})

Then(/^The title is "Dynaway Homework"$/, async () =>  {
    const headerTitle = await $('app-home > ion-header ion-title')
    expect(await headerTitle.getText()).to.equal('Dynaway Homework')
})
