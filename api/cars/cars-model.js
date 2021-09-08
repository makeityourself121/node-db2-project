const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  const result = db('cars').where('id', id).first()
  return result
}

const create = async (cars) => {
  const [id] = await db('cars').insert(cars)
  const newCar = await getById(id)
  return newCar
}

module.exports = {
  getAll,
  getById,
  create,
}
