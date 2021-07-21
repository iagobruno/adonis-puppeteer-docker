import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, ModelAttributes } from '@ioc:Adonis/Lucid/Orm'
import uuid from 'App/Helpers/uuidDecorator'
import Question from './Question'
import User from './User'

export type AnswerAttributes = Partial<ModelAttributes<InstanceType<typeof Answer>>>

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  @uuid()
  public id: string

  @column()
  public body: string

  @column()
  public questionId: string

  @column()
  public authorId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  //#region Relationships
  @belongsTo(() => Question)
  public question: BelongsTo<typeof Question>

  @belongsTo(() => User, {
    foreignKey: 'authorId'
  })
  public author: BelongsTo<typeof User>
  //#endregion Relationships


  //#region Relationships
  public async markAsBestAnswer() {
    const answer = this as Answer

    if (!answer.question) await answer.load('question')
    const question = answer.question

    question.answered = true
    question.bestAnswerId = answer.id
    question.answered_at = DateTime.local().toUTC()
    await question.save()
  }
  //#endregion Relationships
}
