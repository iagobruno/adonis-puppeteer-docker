import Database from '@ioc:Adonis/Lucid/Database'

export const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

export async function cleanUpDatabase() {
  await Promise.all([
    // Database.from('user_categories').delete(),
    // Database.from('accounts_transactions').delete(),
    // Database.from('user_accounts').delete(),
    // Database.from('api_tokens').delete(),
  ])
  await Database.from('users').delete()

  return Promise.resolve()
}

export function deepConsoleLog(data: any, depth: number | null = null) {
  console.log(
    require('util').inspect(data, {
      depth,
      colors: true,
      showHidden: false
    })
  )
}

export function sleep(ms = 1000) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms)
  })
}

export function pause() {
  return new Promise(resolve => { })
}
