const express = require('express')
const Cars = require('./cars-model')
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
} = require('./cars-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
  Cars.getAll()
    .then((car) => {
      res.status(200).json(car)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', checkCarId, (req, res) => {
  res.json(req.car)
})

router.post(
  '/',
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const car = await Cars.create(req.body)
      res.status(201).json(car)
    } catch (err) {
      next(err)
    }
  },
)
module.exports = router
