import test from 'japa'
import { expect } from 'chai'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'
import { cleanUpDatabase } from '../helpers'

test.group('Banco de dados', () => {

  test('O módulo HealthCheck deve conseguir se conectar ao banco de dados', async () => {
    const { healthy, report } = await HealthCheck.getReport()

    expect(healthy).to.be.true
    expect(report.lucid.health.healthy).to.be.true
  })

  test('O módulo Database deve conseguir se conectar ao banco de dados', async () => {
    await cleanUpDatabase()

    await UserFactory.create()

    await Database.query()
      .select('*')
      .from('users')
      .then(result => {
        expect(result).to.not.be.undefined
        expect(result).to.not.be.null
        expect(result).to.be.an('array').with.lengthOf(1)
      })
  })

  test('O banco de dados deve sempre estar no fuso horário UTC', async () => {
    await Database.rawQuery('SHOW timezone;')
      .then(result => {
        expect(result.rows[0].TimeZone).to.equal('UTC')
      })
  })

})
