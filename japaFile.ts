import 'reflect-metadata'
import japa from 'japa'
import { join } from 'path'
import getPort from 'get-port'
import sourceMapSupport from 'source-map-support'
import puppeteer from 'puppeteer'

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })
console.clear()

/**
 * Configure test runner
 */
japa.configure({
  files: getTestFiles(),
  before: [
    startBrowser,
    startHttpServer,
  ],
  after: [
    closeBrowser,
    closeDatabaseConnection,
  ],
  bail: true,
  timeout: 1000 * 25,
})

function getTestFiles() {
  let testFilePath = process.argv.slice(2)[0]
  if (!testFilePath) {
    return 'tests/**/*.(spec|test).(ts|js)'
  }
  else {
    return `tests/**/${testFilePath.replace(/(\.ts$|\.js)$/, '')}.(ts|js)`
  }
}

async function startHttpServer() {
  console.log('Launching Server...')

  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()

  global.SERVER_HOST = `http://localhost:${process.env.PORT}`
}

async function closeDatabaseConnection() {
  // const { default: Database } = await import('@ioc:Adonis/Lucid/Database')
  // await Database.manager.closeAll()
}

async function startBrowser() {
  if (global.BROWSER) await closeBrowser()

  console.log('Launching Puppeteer...')

  global.BROWSER = await puppeteer.launch({
    headless: true,
    // slowMo: 10, // Slows down Puppeteer operations by the specified amount of milliseconds to aid debugging.
  })
}

async function closeBrowser() {
  await global.BROWSER?.close()
  global.BROWSER = null
}
