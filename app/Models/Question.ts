import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import uuid from 'App/Helpers/uuidDecorator'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import type { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'
import User from './User'
import Answer, { AnswerAttributes } from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  @uuid()
  public id: string

  @column()
  public title: string

  @column()
  @slugify({
    fields: ['title'],
    strategy: 'dbIncrement',
    maxLength: 100
  })
  public slug: string

  @column()
  public body: string

  @column()
  public answered: boolean

  @column()
  public bestAnswerId?: string

  @column()
  public answersCount: number

  @column()
  public authorId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public answered_at: DateTime | null


  //#region Relationships
  @belongsTo(() => User, {
    foreignKey: 'authorId'
  })
  public author: BelongsTo<typeof User>

  @hasMany(() => Answer)
  public answers: HasMany<typeof Answer>
  //#endregion Relationships


  //#region Methods
  public async reply(user: User, data: AnswerAttributes, $trx?: TransactionClientContract) {
    const question = this as Question
    if ($trx) question.useTransaction($trx)

    const answer = await question.related('answers').create({
      authorId: user.id,
      questionId: question.id,
      ...data
    })

    question.answersCount++
    await question.save()

    return answer
  }
  //#endregion
}
