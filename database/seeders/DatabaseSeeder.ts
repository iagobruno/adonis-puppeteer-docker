import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'
import { cleanUpDatabase } from '../../tests/_helpers'
import UserFactory from 'Database/factories/UserFactory'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    console.log('Seeding database...')

    await cleanUpDatabase()


    const user1 = await UserFactory.create()
    const user2 = await UserFactory
      .with('questions', 2, (q) => {
        q.with('answers', 3, (a) => {
          a.merge({ authorId: user1.id })
        })
      })
      .create()


    const user3 = await UserFactory.create()

    const question = await user3.related('questions').create({
      title: '[v5] How can i build a local docker development env for Adonis?',
      body: `Hello guys

Can anyone recommend a tutorial to build a local docker development environment for Adonis?

I already created a local environment. But the the npm install is fixed when it was builded. And as is a development environment, I need to run npm comands inside container to install new packages, instal, remove, etc.

How can i do that?`
    })

    const answer = await question.reply(user1, {
      body: `You can try put this line in the end of your NODE.Dockerfile:

CMD [ "adonis" , "serve" ]`
    })

    await answer.markAsBestAnswer()
  }
}
