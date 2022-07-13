const { User, Map } = require('../models')


// Check if the user owns the map requested
const isOwner = () => {
    return async (req,res,next) => {
      if(req.decodedToken.admin){
        next()
        return
      } 

      const user = await User.findByPk(req.decodedToken.id, includeMaps && {
        include:{ model: Map, },
      })

      const isOwner = user.maps.filter(map => map.id === req.params.mapId).length === 1
      if(isOwner){
        req.authPassed = true
        next()
        return
      }

      return res.status(401).send({
        error: "You need to be the owner to do that"
      })
    }
}

module.exports = {isOwner}