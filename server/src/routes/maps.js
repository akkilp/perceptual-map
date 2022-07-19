const router = require("express").Router();
const {
  body,
  validationResult,
  checkSchema,
  param,
} = require("express-validator");
const { isValid } = require("../util/isValidAnswer");

const { Map, Dimension, Answer, Subject } = require("../models");

const { sequelize } = require("../util/db");
const { tokenExtractor } = require("../auth/tokenExtractor");

router.get("/", async (req, res) => {
  const maps = await Map.findAll();
  res.json(maps);
});

router.get("/:mapId", async (req, res) => {
  const { mapId } = req.params;
  const map = await Map.findByPk(mapId);
  if (!map) {
    return res
      .status(404)
      .json({ error: `Map with id ${mapId} does not exist.` });
  }
  res.status(200).send(map);
});

// Create new map
router.post(
  "/",
  body("title").exists().isLength({ min: 3 }),
  body("creator").exists().not().isEmpty().toInt(),
  body("description").isString(),
  tokenExtractor,
  async (req, res) => {
    const { title, description, creator } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}`,
      });
    }

    try {
      const map = await Map.create({
        creator: creator,
        title: title,
        description: description,
      });

      res.statusMessage = `Map '${title}' created succesfully.`;
      res.status(201).send(map);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Creation of new map failed" });
    }
  }
);

const createDimensionSchema = {
  name: {
    isString: true,
    exists: true,
  },
  valueType: {
    isString: true,
    exists: true,
  },
  minValue: {
    isInt: true,
  },
  maxValue: {
    isInt: true,
  },
};

// Create new dimension for a map
router.post(
  "/:mapId/dimensions",
  param("mapId").exists().isNumeric(),
  checkSchema(createDimensionSchema),
  async (req, res) => {
    const { name, valueType, minValue, maxValue } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}`,
      });
    }

    const { mapId } = req.params;
    const mapFound = await Map.findByPk(mapId);
    if (!mapFound) {
      return res
        .status(404)
        .json({ error: `Map with id ${mapId} does not exist.` });
    }

    const newDimension = {
      name: name,
      valueType: valueType,
      minValue: minValue,
      maxValue: maxValue,
      mapId: mapId,
    };

    try {
      const createdDimension = await Dimension.create(newDimension);
      res.statusMessage = `Dimension '${name}' created succesfully.`;
      res.status(201).send(createdDimension);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Creation of dimension failed", error });
    }
  }
);

const updateDimensionSchema = {
  id: {
    exists: true,
  },
  name: {
    isString: true,
    exists: true,
  },
  valueType: {
    isString: true,
    exists: true,
  },
  minValue: {
    isInt: true,
  },
  maxValue: {
    isInt: true,
  },
};

router.patch(
  "/:mapId/dimensions",
  checkSchema(updateDimensionSchema),
  async (req, res) => {
    const { id, name, valueType, minValue, maxValue } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}`,
      });
    }

    const { mapId } = req.params;
    const mapFound = await Map.findByPk(mapId);
    if (!mapFound) {
      return res
        .status(404)
        .json({ error: `Map with id ${mapId} does not exist.` });
    }

    const updatedDimension = {
      id: id,
      name: name,
      valueType: valueType,
      minValue: minValue,
      maxValue: maxValue,
      mapId: mapId,
    };

    try {
      const targetDimension = await Dimension.findByPk(id);

      targetDimension.set(updatedDimension);
      await targetDimension.save();
      res.statusMessage = `Dimension '${name}' updated succesfully.`;
      res.status(201).send(updatedDimension);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Updating dimensions failed", error });
    }
  }
);

// Delete dimension
router.delete("/:mapId/:dimensionId", async (req, res) => {
  const { mapId, dimensionId } = req.params;

  const mapFound = await Map.findByPk(mapId);
  if (!mapFound) {
    return res
      .status(404)
      .json({ error: `Map with id ${mapId} does not exist.` });
  }

  const dimensionFound = await Dimension.findByPk(dimensionId);
  if (!dimensionFound) {
    return res.status(404).json({ error: `Dimension does not exist.` });
  }

  try {
    await Dimension.destroy({
      where: { id: dimensionId },
    });
    res.statusMessage = `Dimension '${dimensionFound.name}' was deleted succesfully.`;
    res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Deleting dimension failed", error });
  }
});

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
  subjectId: {
    isInt: true,
    exists: true,
    toInt: true,
  },
  answer: {
    exists: true,
    toString: true,
  },
};

// Answer to a specific map
router.post("/:mapId", checkSchema(newAnswerSchema), async (req, res) => {
  const { userId, dimensionId, answer, subjectId } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}`,
    });
  }

  const { mapId } = req.params;
  const mapFound = await Map.findByPk(mapId);
  if (!mapFound) {
    return res
      .status(404)
      .json({ error: `Map with id ${mapId} does not exist.` });
  }

  const dimensionFound = mapFound
    .toJSON()
    .dimensions.filter((dim) => dim.id === dimensionId);

  if (!dimensionFound || dimensionFound.length <= 0) {
    return res
      .status(404)
      .json({ error: `Dimension with id ${dimensionId} does not exist.` });
  }

  const { valueType, minValue, maxValue } = dimensionFound[0];
  const inputValueMatchesDimension = isValid(
    answer,
    valueType,
    minValue,
    maxValue
  );
  if (!inputValueMatchesDimension) {
    return res.status(409).json({
      error: `The answer value ${answer} does not match with dimension value ${dimensionFound.valueType}`,
    });
  }

  try {
    const answer_response = await Answer.create({
      userId: userId,
      dimensionId: dimensionId,
      mapId: mapId,
      answer: answer,
      subjectId: subjectId,
    });

    res.status(201).send({ answer_response });
  } catch (error) {
    return res.status(500).json({ error: "Submitting answer failed", error });
  }
});

router.post("/:mapId/subjects", async (req, res) => {
  const { name, color } = req.body;

  const { mapId } = req.params;
  const mapFound = await Map.findByPk(mapId);
  if (!mapFound) {
    return res
      .status(404)
      .json({ error: `Map with id ${mapId} does not exist.` });
  }

  const newSubject = {
    name: name,
    color: color,
    mapId: mapId,
  };

  try {
    const createdSubject = await Subject.create(newSubject);
    res.statusMessage = `Subject '${name}' created succesfully.`;
    res.status(201).send(createdSubject);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Creation of subject failed", error });
  }
});

router.delete("/:mapId/subjects/:subjectId", async (req, res) => {
  const { mapId, subjectId } = req.params;

  const mapFound = await Map.findByPk(mapId);
  if (!mapFound) {
    return res
      .status(404)
      .json({ error: `Map with id ${mapId} does not exist.` });
  }

  const subjectFound = await Subject.findByPk(subjectId);
  if (!subjectFound) {
    return res.status(404).json({ error: `Subject does not exist.` });
  }

  try {
    await Subject.destroy({
      where: { id: subjectId },
    });
    res.statusMessage = `Subject '${subjectFound.name}' was deleted succesfully.`;
    res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Deleting subject failed", error });
  }
});

router.patch("/:mapId/subjects", async (req, res) => {
  const { id, name, color } = req.body;

  const { mapId } = req.params;
  const mapFound = await Map.findByPk(mapId);
  if (!mapFound) {
    return res
      .status(404)
      .json({ error: `Map with id ${mapId} does not exist.` });
  }

  const updatedSubject = {
    id: id,
    name: name,
    color: color,
  };
  try {
    const targetSubject = await Subject.findByPk(id);
    if (!targetSubject) {
      return res
        .status(404)
        .json({ error: `Subject with ${id} does not exist.` });
    }

    targetSubject.set(updatedSubject);
    await targetSubject.save();
    res.statusMessage = `Subject was updated succesfully.`;
    res.status(201).send(updatedSubject);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Updating Subjects failed", error });
  }
});

module.exports = router;
