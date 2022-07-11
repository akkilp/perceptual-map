const router = require('express').Router()
const { body, validationResult } = require('express-validator');

const { Map, Dimension } = require('../models')

const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const maps =  await Map.findAll()
  res.json(maps)
})

router.post('/', 
  body('title').exists().isLength({min: 3}),
  body('creator').exists().not().isEmpty().toInt(),
  body('description').isString(),
  async (req, res) => {
    const { title, description, creator, dimensions } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}` });
    }

    try {
      const map = await Map.create({
        creator: creator,
        title: title,
        description: description,
      })
      res.status(201).send(map)
    } catch(error) {
      console.log(error)
      return res.status(500).json({error: "Creation of new map failed" })
    }
})

router.post('/:map/dimensions/create', 
  body().isArray(),
  body('*.name').exists().isString(),
  body('*.value_type').exists().isString(),
  body('*.minValue').isNumeric(),
  body('*.maxValue').isNumeric(),
  async (req, res) => {
    const { dimensions } = req.body
    console.log(dimensions)
/*     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}` });
    } */
    
    try {
      const _dimensions = dimensions.map((dimension) => {
        return({...dimension, map_id: 1})
      })

      const created_dimensions = await Dimension.bulkCreate(_dimensions)
      res.status(201).send({created_dimensions})
    } catch(error) {
      console.log(error)
      return res.status(500).json({error: "Creation of dimensions failed", error})
    }
})


module.exports = router