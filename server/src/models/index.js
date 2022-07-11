const User = require('./user')
const Map = require('./map')
const Dimension = require('./dimension')


/* await sequelize.sync({ force: true }); */

User.hasMany(Map, {foreignKey: 'id'})
Map.belongsTo(User, {foreignKey: 'creator', as: 'createdBy'})

Map.hasMany(Dimension, {foreignKey: 'map_id'})
Dimension.belongsTo(Map)

module.exports = {
  User, Map, Dimension
}