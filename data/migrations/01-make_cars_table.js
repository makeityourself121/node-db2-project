exports.up = async function (knex) {
  await knex.schema.createTable('cars', (table) => {
    table.increments('id')

    table.string('vin', 17).unique().notNullable()

    table.text('make', 128).notNullable()

    table.text('model', 128).notNullable()

    table.integer('milege').notNullable()

    table.text('title', 128).defaultTo('clean')

    table.text('transimission', 128)
  })
}

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars')
}
