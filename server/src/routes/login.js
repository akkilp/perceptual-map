const bcrypt = require('bcrypt')
const { User } = require('../models')
const { body, validationResult } = require('express-validator');
const router = require('express').Router()

const {SECRET} = require("../util/config")
const jwt = require("jsonwebtoken")


router.post(    
    '/', 
    body('email').exists().isEmail(),
    body('password').exists().isLength({min: 8}),
    async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: `Inserted ${errors.errors[0].param} was invalid: ${errors.errors[0].msg}` });
    }
    const { email, password } = req.body

    const user = await User.findOne({ 
      attributes: ['id', 'username', 'passwordHash', 'admin'],
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
      id: user.id,
      username: user.username,
      admin: user.admin
    }
    
    const token = jwt.sign(userForToken, SECRET)

    res.status(200).send({id: user.id, token: token, username: user.username, admin: user.admin})

})

module.exports = router