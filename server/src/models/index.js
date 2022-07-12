const User = require('./user')
const Map = require('./map')
const Dimension = require('./dimension')
const Answer = require('./answer')



/* await sequelize.sync({ force: true }); */

// Many-To-One
// User-To-Map
User.hasMany(Map, {foreignKey: 'id'})
Map.belongsTo(User, {foreignKey: 'creator', as: 'createdBy'})


// Many-To-One
// Map-To-Dimension
Map.hasMany(Dimension, {foreignKey: 'map_id'})
Dimension.belongsTo(Map)

// Multiple Many-To-One (star schema design https://en.wikipedia.org/wiki/Star_schema)
// One(Answer) -To-Many(User,Map,Dimension)
User.hasMany(Answer, {foreignKey: 'user_id'})
Answer.belongsTo(User)
Map.hasMany(Answer, {foreignKey: 'map_id'})
Answer.belongsTo(Map)
Dimension.hasMany(Answer, {foreignKey: 'dimension_id'})
Answer.belongsTo(Dimension)



module.exports = {
  User, Map, Dimension, Answer
}