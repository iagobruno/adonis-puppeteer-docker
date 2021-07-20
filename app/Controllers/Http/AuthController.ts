import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class AuthController {

  public async redirect({ ally }: HttpContextContract) {
    return ally.use('github').redirect(req => {
      const callbackUrl = `http://localhost:${Env.get('PORT')}/auth/github/callback`
      req.param('redirect_uri', callbackUrl)
    })
  }

  public async callback({ auth, ally, response }: HttpContextContract) {
    const github = ally.use('github')

    /**
     * User has explicitly denied the login request
     */
    if (github.accessDenied()) {
      return 'Access was denied'
    }

    /**
     * Unable to verify the CSRF state
     */
    if (github.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    /**
     * There was an unknown error during the redirect
     */
    if (github.hasError()) {
      return github.getError()
    }

    const githubUser = await github.user()

    /**
   * Find the user by email or create
   * a new one
   */
    const user = await User.firstOrCreate({
      githubId: githubUser.id,
    }, {
      name: githubUser.name,
      email: githubUser.email!,
      avatarUrl: githubUser.avatarUrl ?? undefined,
      accessToken: githubUser.token.token,
      githubId: githubUser.id,
    })

    /**
     * Login user using the web guard
     */
    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }

}
