const Sequelize = require('sequelize')
const db = require('../db')

const Snippet = db.define('snippet', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  url: {
    type: Sequelize.TEXT
  }
})

module.exports = Snippet
