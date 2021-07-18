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

Route.get('/auth/redirect', 'AuthController.redirect')
Route.get('/auth/callback', 'AuthController.callback')

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})


if (Env.get('NODE_ENV') === 'development') {
  Route.get('/health', async () => {
    const report = await HealthCheck.getReport()
    return report
  })
}
