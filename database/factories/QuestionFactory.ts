import Factory from '@ioc:Adonis/Lucid/Factory'
import Question from 'App/Models/Question'
import UserFactory from './UserFactory'

const QuestionFactory = Factory.define(Question, ({ faker }) => {
  return {
    title: faker.lorem.words(6),
    body: faker.lorem.paragraphs(2),
  }
})
  .relation('author', () => UserFactory)
  .build()

export default QuestionFactory
