import { DateTime } from 'luxon'
import { column, BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import uuid from 'App/Helpers/uuidDecorator'
import Question from './Question'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  @uuid()
  public id: string

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public avatarUrl?: string

  @column()
  public githubId: string

  @column()
  public accessToken?: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  //#region Relationships
  @hasMany(() => Question, {
    foreignKey: 'authorId'
  })
  public questions: HasMany<typeof Question>
  //#endregion Relationships

}
