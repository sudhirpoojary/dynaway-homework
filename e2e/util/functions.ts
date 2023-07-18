import WorkOrderListPage from '../src/lists/wo-list.page'
import { expect } from 'chai'
import { getSavedSortByOrder, savedValue } from './data.test'

export const refreshPage = async () => {
  const currentUrl = await browser.getUrl()
  await browser.url(currentUrl)
}

export const waitForRedirectToUrl = async (url: string, reverse: boolean = false, timeout: number = 15000) =>
  await browser.waitUntil(
    async () => {
      const currentUrl = await browser.getUrl()
      return reverse ? currentUrl !== url : currentUrl === url
    },
    {
      timeout,
      timeoutMsg: `expected to be at ${url} after ${timeout} `,
    }
  )

// An array of elements is instantiated empty in the very beginning, which does not make the test fail (since querying elements is a non-breaking operation).
// Wait a until an array of elements is not empty.
export const waitForElementArray = async (
  elements: WebdriverIO.ElementArray,
  timeout: number = 15000,
  elementName?: string
) => {
  await browser.waitUntil(
    async () => {
      const elementArray = await $$(`${elements.selector}`)
      return !!elementArray.length
    },
    {
      timeout,
      timeoutMsg: `expected ${elementName ? elementName : ''} element array to be filled after ${timeout} ms ("${
        elements.selector
      }")`,
    }
  )
}
export const waitForElementArrayToBe = async (
  elementSelector: WebdriverIO.ElementArray,
  length: number,
  timeout: number = 15000
) => {
  await browser.waitUntil(
    async () => {
      const elementArray = await $$(`${elementSelector.selector}`)
      return elementArray.length === length
    },
    {
      timeout,
      timeoutMsg: `expected element array to have ${length} elements after ${timeout} ms`,
    }
  )
}

export const waitForElementText = async (element: WebdriverIO.Element, timeout: number = 10000) => {
  await browser.waitUntil(
    async () => {
      // NB: Note that this will not work as expected if using chained selectors as the element.selector will only represent the latest passed selector
      const getElement = await $(`${element.selector}`)
      await getElement.waitForDisplayed({
        timeout,
        timeoutMsg: `element you want to get the the text for, (${element.selector}), still not displayed after ${timeout}ms`,
      })
      let elementText = await getElement.getText()
      return !!elementText
    },
    {
      timeout,
      timeoutMsg: `expected text to appear after ${timeout} ms (${element.selector})`,
    }
  )
}

export const waitForJobsButtonToggle = (timeout: number = 15000) =>
  browser.waitUntil(
    async () => {
      const isToggleChecked = await WorkOrderListPage.isToggleChecked()
      return isToggleChecked === 'false'
    },
    {
      timeout,
      timeoutMsg: `expected jobs button to be toggled off after ${timeout} ms`,
    }
  )

export const waitForDisabled = (field: string, shouldBeDisabled: boolean = true) =>
  browser.waitUntil(
    async () => {
      const list = $('app-work-order-create ion-content ion-list')
      await list.waitForExist()
      const variantField = (await list).$(`ion-item*=${field}`)
      await variantField.waitForExist({ timeout: 50000 })
      const fieldClass = await variantField.getAttribute('class')
      const isDisabledClassDisplayed =
        fieldClass.includes('item-interactive-disabled') && fieldClass.includes('item-select-disabled')
      if (shouldBeDisabled) {
        return isDisabledClassDisplayed
      } else {
        return !isDisabledClassDisplayed
      }
    },
    {
      timeout: 10000,
      timeoutMsg: `expected ${field} field to be disabled: ${shouldBeDisabled} after 10000 ms`,
    }
  )

export const expectSuccessToast = async (message?: string) => {
  const successToast = await $('ion-toast.ion-color-success')
  await waitForElementText(successToast, 300000)
  const toastMessage = await successToast.getText()
  expect(toastMessage).to.equal(message)
  await successToast.waitForDisplayed({ reverse: true })
}

export const expectDetailToEqual = (detail: string, elementsText: string[]) => {
  const savedDetail = savedValue(detail)
  if (savedDetail !== 'All') {
    for (const text of elementsText) {
      expect(text!.toUpperCase()).to.equal(savedDetail.toUpperCase())
    }
  }
}

export const expectDetailToInclude = (detail: string, elementsText: string[]) => {
  const savedDetail = savedValue(detail)
  if (savedDetail !== 'All') {
    for (const text of elementsText) {
      expect(text!.toUpperCase()).to.include(savedDetail.toUpperCase())
    }
  }
}

export const expectDetailToStartWith = (detail: string, elementsText: string[]) => {
  const savedDetail = savedValue(detail)
  if (savedDetail !== 'All') {
    for (const text of elementsText) {
      expect(text!.toUpperCase().startsWith(savedDetail.toUpperCase())).to.be.true
    }
  }
}

export const expectSortByButton = async () => {
  let savedSortBy = savedValue('Sort by')
  const savedSortByOrder = getSavedSortByOrder()
  if (savedSortBy === 'ID') savedSortBy = 'Work order ID'

  const filterOptionsButton = await WorkOrderListPage.filterOptionsButton
  await waitForElementText(filterOptionsButton)
  const filterOptionsButtonText = await filterOptionsButton.getText()
  expect(filterOptionsButtonText.toUpperCase()).to.equal(savedSortBy.toUpperCase())

  const iconUp = await WorkOrderListPage.orderIconUp
  const iconUpClass = await iconUp.getAttribute('class')
  const iconDown = await WorkOrderListPage.orderIconDown
  const iconDownClass = await iconDown.getAttribute('class')
  if (savedSortByOrder === 'Ascending') {
    expect(await iconUpClass).to.include('selected')
    expect(await iconDownClass).to.not.include('selected')
  } else if (savedSortByOrder === 'Descending') {
    expect(await iconUpClass).to.not.include('selected')
    expect(await iconDownClass).to.include('selected')
  }
}

export const isListSorted = (elementList: string[]) => {
  const savedSortByOrder = getSavedSortByOrder()
  const localeSort = Array.from(elementList).sort((a: string, b: string) => {
    if (savedSortByOrder === 'Ascending') {
      return a.localeCompare(b, 'en', { sensitivity: 'base' })
    } else if (savedSortByOrder === 'Descending') {
      return b.localeCompare(a, 'en', { sensitivity: 'base' })
    } else {
      throw new Error('Object has one or more undefined members')
    }
  })
  return JSON.stringify(elementList) === JSON.stringify(localeSort)
}

export const compareDatesWithMargin = (dateA: string, dateB: string, margin: number = 60000) => {
  const parsedA = Date.parse(dateA) // Convert to a number
  const parsedB = Date.parse(dateB)
  const absoluteDifference = Math.abs(parsedA - parsedB) // get the difference in milliseconds
  return absoluteDifference < margin // the difference should be less than margin
}
