
// Checks whether the user in token is the same as the one requested for
const isMe = () => {
  return async (req,res,next) => {
    if(req.decodedToken.admin){
      next()
      return
    } 

    const userId = req.params.userId
    if(req.decodedToken.id === parseInt(userId)){
      next()
      return
    } 
    return res.status(401).send({
      error: "You do not have rights to enter into personal route"
    })
  }
}

module.exports = {isMe}