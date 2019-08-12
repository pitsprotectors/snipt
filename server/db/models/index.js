const User = require('./user')
const Project = require('./project')
const Question = require('./question')
const Snippet = require('./snippet')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

User.hasMany(Project)
Project.hasMany(Question)
Question.hasMany(Snippet)

Snippet.belongsTo(Question)
Question.belongsTo(Project)
Project.belongsTo(User)

module.exports = {
  User,
  Project,
  Question,
  Snippet
}
