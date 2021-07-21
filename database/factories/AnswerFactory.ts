import Factory from '@ioc:Adonis/Lucid/Factory'
import Answer from 'App/Models/Answer'
import QuestionFactory from './QuestionFactory'
import UserFactory from './UserFactory'

const AnswerFactory = Factory.define(Answer, ({ faker }) => {
  return {
    body: faker.lorem.paragraphs(3),
  }
})
  .relation('question', () => QuestionFactory)
  .relation('author', () => UserFactory)
  .build()

export default AnswerFactory
