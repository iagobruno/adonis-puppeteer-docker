import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
  protected tableName = 'answers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.text('body').notNullable()
      table.string('question_id')
        .notNullable()
        .references('id').inTable('questions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('author_id')
        .notNullable()
        .references('id').inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.alterTable('questions', (table) => {
      table.string('best_answer_id')
        .nullable()
        .references('id').inTable('answers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable('questions', (table) => {
      table.dropColumn('best_answer_id')
    })

    this.schema.dropTable(this.tableName)
  }
}
