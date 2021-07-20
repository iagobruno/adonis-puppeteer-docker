/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes.
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Env from '@ioc:Adonis/Core/Env'

Route.get('/auth/github', 'AuthController.redirect')
Route.get('/auth/github/callback', 'AuthController.callback')

Route.on('/').render('pages/home').as('home')

Route.group(() => {
})
  .middleware('auth')


if (Env.get('NODE_ENV') === 'development') {
  Route.get('/health', async () => {
    const report = await HealthCheck.getReport()
    return report
  })
}
