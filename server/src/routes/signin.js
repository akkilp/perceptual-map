const bcrypt = require('bcrypt')

const { User } = require('../models')
const { body, validationResult } = require('express-validator');

const router = require('express').Router()

const { Op } = require("sequelize");

const {SECRET} = require("../util/config")
const jwt = require("jsonwebtoken")


const registrationFunction = async (req, res ,isAdmin=false) => {

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

    let newUserObj = {
      username,
      email,
      passwordHash
    }

    if(isAdmin) {
      const secret = req.body.secret

      if (secret !== SECRET){
        return res.status(401).json({
          error: "Invalid secret code for registering to admin"
        })
      }

      newUserObj = {...newUserObj, secret, admin: true}
    }

    const user = await User.create(newUserObj)

    const userForToken = {
      username: user.username,
      id: user.id,
    }
    
    const token = jwt.sign(userForToken, SECRET)

    res.status(201).send({id: user.id, token: token, username: user.username, admin: user.admin})
}

// Normal user sign in
router.post(    
    '/', 
    body('username').exists().isLength({min: 3}),
    body('email').exists().isEmail(),
    body('password').exists().isLength({min: 8}),
    async (req, res) => 
    registrationFunction(req,res)
  )


// Admin signin
router.post(    
  '/admin', 
  body('username').exists().isLength({min: 3}),
  body('email').exists().isEmail(),
  body('password').exists().isLength({min: 8}),
  body('secret').exists(),
  async (req, res) => 
  registrationFunction(req,res, isAdmin=true)
)

module.exports = router