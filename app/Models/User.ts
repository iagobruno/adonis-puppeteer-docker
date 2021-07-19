import { DateTime } from 'luxon'
import { column, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import uuid from 'App/Helpers/uuidDecorator'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  @uuid()
  public id: number

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
}
