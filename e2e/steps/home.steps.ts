import { Given, When, Then} from '@cucumber/cucumber'
import { expect }  from 'chai'

Given(/^I am on the home page$/, async () => {
   
    await browser.url('/home')
    await browser.maximizeWindow()
})
  
Given(/^The header is displayed$/, async () =>  {
    const headerElement = await $('app-home > ion-header')
    await headerElement.waitForDisplayed()
})

Then(/^The title is "Dynaway Homework"$/, async () =>  {
    const headerTitle = await $('app-home > ion-header ion-title')
    expect(await headerTitle.getText()).to.equal('Dynaway Homework')
})

Given(/^User clicks on any of the record in home page$/, async () => {
    
    const skoda = await $('//ion-text[normalize-space()="Skoda Octavia"]')
    await skoda.waitForDisplayed({ timeout: 10000 })
    await skoda.click()
})

When(/^Details page should have Location, Warranty, Maintanance Notes and Model fields$/, async () => {
    await $('//h2[normalize-space()="Location"]').isDisplayed()
    await $('//h2[normalize-space()="Warranty"]').isDisplayed()
    await $('//h2[normalize-space()="Maintenance Notes"]').isDisplayed()
    await $('//h2[normalize-space()="Model"]').isDisplayed()

})

Then(/^Location value should be (.+), Warranty value should be (.+), Model value should be (.+) and Maintanance should be (.+)$/, async (Location, Warranty,Model, Maintanance) => {
    
    const locationValue = await $('//p[normalize-space()="Copenhagen office"]')
    expect(await locationValue.getText()).to.equal(Location)

    const warrantyValue = await $('//p[normalize-space()="1 month(s) remaining"]')
    await warrantyValue.waitForDisplayed()
    expect(await warrantyValue.getText()).to.equal(Warranty)

    const modelValue = await $('//p[normalize-space()="Octavia Model"]')
    await modelValue.scrollIntoView();
    expect(await modelValue.getText()).to.equal(Model)
  
    const MaintananceValue = await $('//p[normalize-space()="Requires oil change every 10,000 miles."]')
    expect(await MaintananceValue.getText()).to.equal(Maintanance)

})



Given(/^Work orders are displayed in home page$/, async () =>  {
    const item = await $('//ion-col[1]//app-asset-card[1]//ion-card[1]//div[1]//ion-card-content[1]')
    await item.waitForDisplayed()
})

Then(/^Every work order should have location, id and name fields$/, async () =>  {
    await $('ion-col:nth-child(2) app-asset-card:nth-child(1) ion-card:nth-child(1) div:nth-child(1) ion-card-content:nth-child(1) div:nth-child(1) ion-text:nth-child(1)').isDisplayed()
    await $('ion-col:nth-child(2) app-asset-card:nth-child(1) ion-card:nth-child(1) div:nth-child(1) ion-card-content:nth-child(1) div:nth-child(1) ion-text:nth-child(1)').isDisplayed()
    await $('ion-col:nth-child(2) app-asset-card:nth-child(1) ion-card:nth-child(1) div:nth-child(1) ion-card-content:nth-child(1) div:nth-child(1) ion-text:nth-child(1)').isDisplayed()
})