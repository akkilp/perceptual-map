const router = require('express').Router()

const { Map } = require('../models')


router.get('/', async (req, res) => {
  const maps =  await Map.findAll()
  res.json(maps)
})

router.post('/', async (req, res) => {
  try {
    const map = await Map.create(req.body)
    res.json(map)
  } catch(error) {
    return res.status(400).json({ error })
  }
})


module.exports = router