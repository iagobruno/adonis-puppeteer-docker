import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import uuid from 'App/Helpers/uuidDecorator'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import User from './User'

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
  //#endregion Relationships


  //#region Methods
  public async markAsAnswered() {
    this.answered = true
    this.answered_at = DateTime.local().toUTC()
    await this.save()
  }
  //#endregion
}
