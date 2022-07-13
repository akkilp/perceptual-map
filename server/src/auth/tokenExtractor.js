const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config.js')


const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'Inserted token in invalid' })
    }
  } else {
    return res.status(401).json({ error: 'Token is missing from request' })
  }
  next()
}

module.exports = { tokenExtractor }