import test from 'japa'
import { expect } from 'chai'
import type { Page, BrowserContext } from 'puppeteer'
import { cleanUpDatabase } from './_helpers'

test.group('/auth/redirect', (group) => {
  let page: Page
  let context: BrowserContext

  group.beforeEach(async () => {
    await cleanUpDatabase()
    context = await global.BROWSER?.createIncognitoBrowserContext()
    page = await context.newPage()!
  })

  group.afterEach(async () => {
    await page?.close()
    await context?.close()
  })

  test('Deve redirecionar para o login do GitHub', async () => {
    await page.goto(global.SERVER_HOST! + '/auth/redirect')

    expect(page.url()).to.contain('https://github.com/login')
    expect(page.url()).to.contain('client_id=234f904347d02a7ed672')
  })

  test('O login do Github deve redirecionar para a rota /auth/callback', async () => {
    await page.goto(global.SERVER_HOST! + '/auth/redirect')

    await page.type('#login_field', 'iagobruno.dev@gmail.com')
    await page.type('#password', 'POlhbO8RdruV5TQe1h')

    await Promise.all([
      page.waitForRequest(req => req.url().includes('/auth/callback')),
      page.click('[type="submit"][value="Sign in"]')
    ])
  })

  test('Deve redirecionar para a página inicial após o login', async () => {
    await page.goto(global.SERVER_HOST! + '/auth/redirect')

    await page.type('#login_field', 'iagobruno.dev@gmail.com')
    await page.type('#password', 'POlhbO8RdruV5TQe1h')

    const expectedUrl = `http://localhost:${process.env.PORT}/`
    await Promise.all([
      page.waitForRequest(req => req.url() === expectedUrl),
      page.click('[type="submit"][value="Sign in"]')
    ])
  })

})
