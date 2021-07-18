import test from 'japa'
import { expect } from 'chai'
import type { Page } from 'puppeteer'

test.group('/ (Home page)', (group) => {
  let page: Page

  group.beforeEach(async () => {
    page = await global.BROWSER?.newPage()!
  })

  group.afterEach(async () => {
    await page?.close()
  })

  test('Should be able to render the home page', async () => {
    await page.goto(global.SERVER_HOST!)

    const h1Text = await page.$eval('h1.title', (h1) => h1.textContent)

    expect(h1Text).to.contain('It Works!')
  })

})
