const { User } = require('../models')
const { tokenExtractor } = require('../auth/tokenExtractor')
const { isAdmin, isMe } = require('../auth')

const router = require('express').Router()

router.get(    
    '/', 
    tokenExtractor,
    isAdmin(),
    async (req, res) => {
    const users = await User.findAll()
    res.status(200).send(users)
})

router.get(    
    '/:userId', 
    tokenExtractor,
    isMe(),
    async (req, res) => {
    const users = await User.findByPk(req.params.userId)
    res.status(200).send(users)
})

module.exports = router