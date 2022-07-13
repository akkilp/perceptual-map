

// Checks whether the user token has attribute admin
const isAdmin = () => {
  return async (req,res,next) => {
    if(req.decodedToken.admin){
      next()
      return
    } 
    return res.status(401).send({
      error: "You need admin permissions to pass"
    })
  }
}


module.exports = {isAdmin}