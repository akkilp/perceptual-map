const {SECRET} = require("../util/config")
const jwt = require("jsonwebtoken")

const getToken = async (userObj) => {
    const token = jwt.sign(userObj, SECRET)
    return token
}


module.exports = { getToken }