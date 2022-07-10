const bcrypt = require('bcrypt')

const User = require('../models/user')
const { body, validationResult } = require('express-validator');

const router = require('express').Router()

const { Op } = require("sequelize");

const {SECRET} = require("../util/config")
const jwt = require("jsonwebtoken")


router.post(    
    '/', 
    body('username').exists().isLength({min: 3}),
    body('email').exists().isEmail(),
    body('password').exists().isLength({min: 8}),
    async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}` });
    }
    const { username, email, password } = req.body

    const userExists = await User.findOne({ 
        where: { 
          [Op.or]: [
            { username: username},
            { email: email }
          ]
        }
    })

    if (userExists) {
        return res.status(401).json({
            error: 'The email or username is already taken'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({
        username,
        email,
        passwordHash: passwordHash
    })

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    
    const token = jwt.sign(userForToken, SECRET)

    res.status(201).send({id: user.id, token: token, username: user.username})
})

router.post(    
  '/admin', 
  body('username').exists().isLength({min: 3}),
  body('email').exists().isEmail(),
  body('password').exists().isLength({min: 8}),
  async (req, res) => {

  const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}` });
      }
  const { username, email, password, secret } = req.body

  // Allow registering admin only when they know the secret
  if (secret !== SECRET){
    res.status(401).json({
      error: "Invalid secret code for registering to admin"
    })
  }

  const userExists = await User.findOne({ 
      where: { 
        [Op.or]: [
          { username: username},
          { email: email }
        ]
      }
  })


  if (userExists) {
      return res.status(401).json({
          error: 'The email or username is already taken'
        })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({
      username,
      email,
      passwordHash: passwordHash,
      admin: true
  })

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  
  const token = jwt.sign(userForToken, SECRET)

  res.status(201).send({id: user.id, token: token, username: user.username})
})

module.exports = router