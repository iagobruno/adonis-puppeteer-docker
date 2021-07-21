import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    // Clean up database
    // await Database.from('answers').delete()
    await Database.from('questions').delete()
    await Database.from('users').delete()


    const user = await UserFactory
      .with('questions', 2)
      .create()

    const [question1, question2] = user.questions

    // await question1.markAsAnswered()
  }
}
