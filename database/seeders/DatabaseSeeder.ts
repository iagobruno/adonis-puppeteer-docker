import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    // Clean up database
    await Database.from('users').delete()

    const user = await UserFactory.create()
  }
}
