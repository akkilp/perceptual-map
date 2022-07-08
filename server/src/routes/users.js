const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = require('express').Router()

router.get(    
    '/', 
    async (req, res) => {
    const users = await User.findAll()
    res.status(200).send(users)

})

module.exports = router