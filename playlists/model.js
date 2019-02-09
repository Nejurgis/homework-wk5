const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../users/model')

const Playlist = sequelize.define('playlists', {
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  name: {
    type: Sequelize.STRING,
    field: 'name',
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    field: 'description',
    allowNull: true
  },
}, {
  timestamps: false,
  tableName: 'playlists'
})

module.exports = Playlist
Playlist.belongsTo(User)