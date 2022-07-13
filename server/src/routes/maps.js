const router = require('express').Router()
const { body, validationResult, checkSchema } = require('express-validator');
const {isValid} = require('../util/isValidAnswer')

const { Map, Dimension, Answer } = require('../models')

const { sequelize } = require('../util/db');
const { tokenExtractor } = require('../auth/tokenExtractor');

router.get('/', async (req, res) => {
  const maps =  await Map.findAll()
  res.json(maps)
})

router.get('/:mapId', async (req, res) => {
  const { mapId } = req.params;
  const map = await Map.findByPk(mapId)
  if(!map) {
    return res.status(404).json({error: `Map with id ${mapId} does not exist.`});
  }
  res.status(200).send(map)
})


// Create new map
router.post('/', 
  body('title').exists().isLength({min: 3}),
  body('creator').exists().not().isEmpty().toInt(),
  body('description').isString(),
  tokenExtractor,
  async (req, res) => {
    const { title, description, creator } = req.body

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


const newDimensionSchema = {
  dimensions: {
      isArray: true
  },
  "dimensions.*.name": {
    isString: true,
    exists: true,
  },
  "dimensions.*.valueType": {
    isString: true,
    exists: true
  },
  "dimensions.*.minValue": {
    isInt: true,
  },
  "dimensions.*.maxValue": {
    isInt: true
  }
}

// Create new dimension for a map
router.post('/:mapId/dimensions', 
  checkSchema(newDimensionSchema),
  async (req, res) => {
    const { dimensions } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}` });
    } 
    
    const { mapId } = req.params;
    const mapFound = await Map.findByPk(mapId)
    if(!mapFound) {
      return res.status(404).json({error: `Map with id ${mapId} does not exist.`});
    }

    const dimensionsWithMapId = dimensions.map((dimension) => {
      return({...dimension, mapId: mapId})
    })

    try {
      const created_dimensions = await Dimension.bulkCreate(dimensionsWithMapId)
      res.status(201).send({created_dimensions})
    } catch(error) {
      return res.status(500).json({error: "Creation of dimensions failed", error})
    }
})



const newAnswerSchema = {
  userId: {
      isInt: true,
      exists: true,
      toInt: true,
  },
  mapId: {
    isInt: true,
    exists: true,
    toInt: true,
  },
  dimensionId: {
    isInt: true,
    exists: true,
    toInt: true,
  },
  answer: {
    exists: true,
    toString: true,
  },
}

// Answer to a specific map
router.post('/:mapId', checkSchema(newAnswerSchema), async (req, res) => { 
  const { userId, dimensionId, answer } = req.body;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}` });
  } 

  const { mapId } = req.params;
  const mapFound = await Map.findByPk(mapId)
  if(!mapFound) {
    return res.status(404).json({error: `Map with id ${mapId} does not exist.`});
  }

 const dimensionFound = mapFound.toJSON().dimensions.filter((dim)=> dim.id === dimensionId)
 if(!dimensionFound || dimensionFound.length <= 0) {
  return res.status(404).json({error: `Dimension with id ${dimensionId} does not exist.`});
 }

if (!(isValid(answer, dimensionFound.valueType, dimensionFound.minValue, dimensionFound.maxValue))){
  return res.status(409).json({error: `The answer value ${answer} does not match with dimension value ${dimensionFound.valueType}`});
}


  try {
    const answer_response = await Answer.create({
      userId: userId,
      dimensionId: dimensionId,
      mapId: mapId,
      answer: answer
    })
    res.status(201).send({answer_response})
  } catch(error) {
    console.log(error)
    return res.status(500).json({error: "Submitting answer failed", error})
  }
}
)


module.exports = router