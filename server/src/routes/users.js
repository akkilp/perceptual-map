const { User, Map, Answer } = require("../models");
const { tokenExtractor } = require("../auth/tokenExtractor");
const { isAdmin, isMe } = require("../auth");

const router = require("express").Router();

router.get("/", tokenExtractor, isAdmin(), async (req, res) => {
  const users = await User.findAll();
  res.status(200).send(users);
});

router.get("/:userId", tokenExtractor, isMe(), async (req, res) => {
  try {
    const users = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Map,
          attributes: ["title", "description", "created_at"],
        },
        {
          model: Answer,
          attributes: ["map_id"],
          include: [
            {
              model: Map,
              exclude: ["dimensions", "answers"],
            },
          ],
        },
      ],
    });
    res.status(200).send(users);
  } catch (err) {
    return res.status(err.status).send(err);
  }
});

module.exports = router;
