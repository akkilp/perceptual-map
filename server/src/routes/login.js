const bcrypt = require('bcrypt')
const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const router = require('express').Router()

const {getToken} = require("../util/getToken")

const {SECRET} = require("../util/config")
const jwt = require("jsonwebtoken")


router.post(    
    '/', 
    body('email').exists().isEmail(),
    body('password').exists().isLength({min: 8}),
    async (req, res) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    const { email, password } = req.body

    const user = await User.findOne({ 
      where: { 
        email: email
      },
    })
    
    const validPassword = user 
    ? await bcrypt.compare(password, user.passwordHash)
    : false
   
    if (!(user && validPassword)) {
      return res.status(401).json({
        error: 'Invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    
    const token = jwt.sign(userForToken, SECRET)

    res.status(200).send({token, username: user.username})

})

module.exports = router