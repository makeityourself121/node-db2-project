const Cars = require('./cars-model')
const vinValidator = require('vin-validator')
const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params
    const car = await Cars.getById(id)
    if (car) {
      req.car = car
      next()
    } else {
      next({
        status: 404,
        message: `car with id ${id} is not found`,
      })
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body

  if (!vin) {
    res.status(400).json({ message: 'vin is missing' })
  } else if (!make) {
    res.status(400).json({ message: 'make is missing' })
  } else if (!model) {
    res.status(400).json({ message: 'model is missing' })
  } else if (!mileage) {
    res.status(400).json({ message: 'mileage is missing' })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body

  if (!vinValidator.validate(vin)) {
    res.status(400).json({ message: `vin ${vin} is invalid` })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.body
    const existing = await db('cars').where('vin', vin).first()
    if (existing) {
      res.status(400).json({ message: `vin ${vin} already exists` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
