const axios = require('axios')
module.exports = {
  User: {
    projects: parent => parent.getProjects()
  },
  Project: {
    questions: parent => parent.getQuestions(),
    user: parent => parent.getUser()
  },
  Question: {
    snippets: parent => parent.getSnippets(),
    project: parent => parent.getProject()
  },
  Snippet: {
    question: parent => parent.getQuestion()
  },
  Query: {
    projects: (parent, args, {db}, info) => db.models.project.findAll(),
    users: (parent, args, {db}, info) => db.models.user.findAll(),
    project: (parent, {id}, {db}, info) => db.models.project.findByPk(id),
    user: (parent, {id}, {db}, info) => db.models.user.findByPk(id),
    questions: (parent, args, {db}, info) => db.models.question.findAll(),
    snippets: (parent, args, {db}, info) => db.models.snippet.findAll(),
    question: (parent, {id}, {db}, info) => db.models.question.findByPk(id),
    snippet: (parent, {id}, {db}, info) => db.models.snippet.findByPk(id),

    me: async (parent, args, context, info) => {
      return context.req.user
    },
    show: (parent, {id}, {db}, info) =>
      db.models.question.findAll({where: {projectId: id, show: true}})
  },
  Mutation: {
    questionStart: async (parent, {id}, {db}, info) => {
      const question = await db.models.question.findByPk(id)
      const now = new Date()
      return question.update({
        startTime: now,
        show: true
      })
    },
    login: async (parent, {email, password}, context, info) => {
      const {user} = await context.authenticate('graphql-local', {
        email,
        password
      })
      context.login(user)
      return {user}
    },
    logout: async (parent, args, context, info) => {
      if (context.req.user) {
        context.logout()
        context.req.session.destroy()
        // context.res.redirect("http://localhost:4000/")
      }
      return 200
    },
    deleteSnippet: (parent, {id}, {db}, info) => {
      db.models.snippet.destroy({
        where: {
          id: id
        }
      })
      return id
    },
    deleteQuestion: (parent, {id}, {db}) => {
      db.models.question.destroy({
        where: {
          id: id
        }
      })
      return id
    },
    deleteProject: (parent, {id}, {db}) => {
      db.models.project.destroy({
        where: {
          id: id
        }
      })
      return id
    },
    createSnippet: (parent, {questionId, content, url}, {db}) => {
      console.log('REACHED RESOLVER: ', questionId, content, url)
      return db.models.snippet.create({
        questionId,
        content,
        url
      })
    },
    createQuestion: (parent, {projectId, content}, {db}, info) =>
      db.models.question.create({
        projectId,
        content
      }),
    createProject: (parent, {userId, name}, {db}) =>
      db.models.project.create({
        userId,
        name
      }),
    createUser: async (
      parent,
      {firstName, lastName, email, password},
      context,
      info
    ) => {
      const existingUser = await context.db.models.user.findOne({
        where: {email: email}
      })
      if (existingUser) {
        throw new Error('User with email already exists')
      }
      const newUser = await context.db.models.user.create({
        firstName,
        lastName,
        email,
        password
      })
      context.login(newUser)
      return {user: newUser}
    },
    updateProject: async (parent, {id, name}, {db}) => {
      console.log(id, name)
      const project = await db.models.project.findByPk(id)
      return project.update({
        name
      })
    },
    updateQuestion: async (parent, {id, content}, {db}) => {
      const question = await db.models.question.findByPk(id)
      return question.update({
        content
      })
    },
    updateUser: async (
      parent,
      {id, firstName, lastName, email, password},
      {db}
    ) => {
      const user = await db.models.user.findByPk(id)
      return user.update({
        firstName,
        lastName,
        email,
        password
      })
    }
  }
}
