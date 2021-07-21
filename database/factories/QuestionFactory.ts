import Factory from '@ioc:Adonis/Lucid/Factory'
import Question from 'App/Models/Question'
import UserFactory from './UserFactory'
import AnswerFactory from './AnswerFactory'

const QuestionFactory = Factory.define(Question, ({ faker }) => {
  return {
    title: faker.lorem.words(6),
    body: faker.lorem.paragraphs(2),
  }
})
  .relation('author', () => UserFactory)
  .relation('answers', () => AnswerFactory)
  .build()

export default QuestionFactory
