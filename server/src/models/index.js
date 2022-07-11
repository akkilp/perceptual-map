const User = require('./user')
const Map = require('./map')


/* await sequelize.sync({ force: true }); */

User.hasMany(Map, {foreignKey: 'id'})
Map.belongsTo(User, {foreignKey: 'creator'})


module.exports = {
  User, Map
}