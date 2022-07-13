const { isAdmin } = require('./isAdmin')
const { isMe } = require('./isMe')
const { isOwner } = require('./isOwner')
const { tokenExtractor} = require('./tokenExtractor')


module.exports = {isAdmin, isMe, isOwner, tokenExtractor}