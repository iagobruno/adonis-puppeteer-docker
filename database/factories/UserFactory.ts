import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import QuestionFactory from './QuestionFactory'

const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatarUrl: faker.image.people(),
    githubId: faker.datatype.uuid()
  }
})
  .relation('questions', () => QuestionFactory)
  .build()

export default UserFactory
