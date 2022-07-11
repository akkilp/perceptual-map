const { User } = require('../models')
const { tokenExtractor } = require('../util/tokenExtractor')
const router = require('express').Router()

router.get(    
    '/', 
    tokenExtractor,
    async (req, res) => {
    const users = await User.findAll()
    res.status(200).send(users)

})

module.exports = router