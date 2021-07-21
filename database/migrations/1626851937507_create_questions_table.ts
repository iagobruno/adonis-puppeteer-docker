import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('title', 255).notNullable()
      table.string('slug', 255).notNullable().unique().index()
      table.text('body').notNullable()
      table.boolean('answered').defaultTo(false).notNullable()
      table.integer('answers_count').defaultTo(0).unsigned().notNullable()
      table.string('author_id')
        .notNullable()
        .references('id').inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('answered_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
