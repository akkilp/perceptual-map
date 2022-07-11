const router = require('express').Router()
const { body, validationResult } = require('express-validator');

const { Map } = require('../models')

router.get('/', async (req, res) => {
  const maps =  await Map.findAll()
  res.json(maps)
})

router.post('/', 
  body('title').exists().isLength({min: 3}),
  body('creator').exists().not().isEmpty().toInt(),
  body('description').isString(),
  async (request, response) => {
    const { title, description, creator } = request.body
    try {
      const map = await Map.create({
        creator: creator,
        title: title,
        description: description
      })

      response.json(map)
    } catch(error) {
      return response.status(400).json({ error })
    }
})


module.exports = router