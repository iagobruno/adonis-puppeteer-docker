import 'reflect-metadata'
import japa from 'japa'
import { join } from 'path'
import getPort from 'get-port'
import execa from 'execa'
import sourceMapSupport from 'source-map-support'
import puppeteer from 'puppeteer'

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') {
  console.error("It's not allowed to run tests in production environment as tests has destructive sql operations.")
  process.exit(1)
}

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
    runMigrations,
  ],
  after: [
    closeBrowser,
    closeDatabaseConnection,
    rollbackMigrations,
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

  const isInsideDockerContainer = process.platform === 'linux'
  const executablePath = isInsideDockerContainer ? '/usr/bin/chromium-browser' : undefined

  global.BROWSER = await puppeteer.launch({
    executablePath,
    args: ['--no-sandbox', '--disable-gpu'],
    slowMo: 0,
  })
}

async function closeBrowser() {
  await global.BROWSER?.close()
  global.BROWSER = null
}

async function runMigrations() {
  console.log('Running migrations...')

  await execa.node('ace', ['migration:run'], {
    stdio: 'inherit',
  })
}

async function rollbackMigrations() {
  console.log('Rollbacking migrations...')

  await execa.node('ace', ['migration:rollback'], {
    stdio: 'inherit',
  })
}
