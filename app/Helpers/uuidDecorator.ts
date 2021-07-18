import type { DecoratorFn, LucidModel } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid_v4 } from 'uuid'

export default function uuid(): DecoratorFn {
  return function (target: any, property: string) {
    const Model = target.constructor as LucidModel

    /**
     * Boot the model if not already booted
     */
    Model.boot()

    Model.before('create', async function (row) {
      const rowModel = row.constructor as LucidModel

      /**
       * Do not set slug when already defined manually
       */
      if (row[property]) {
        return
      }

      row[property] = uuid_v4()
    })
  }
}
