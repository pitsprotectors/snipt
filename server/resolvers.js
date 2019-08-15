const axios = require('axios')
module.exports = {
  User: {
    projects: (parent, args, context, info) => parent.getProjects()
  },
  Project: {
    questions: (parent, args, context, info) => parent.getQuestions(),
    user: (parent, args, context, info) => parent.getUser()
  },
  Question: {
    snippets: (parent, args, context, info) => parent.getSnippets(),
    project: (parent, args, context, info) => parent.getProject()
  },
  Snippet: {
    question: (parent, args, context, info) => parent.getQuestion()
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
    me: async (parent, args, {db}, info) => {
      console.log('before')
      const {data} = await axios.get('http://localhost:4000/auth/me')
      return data
    }
  },
  Mutation: {
    login: async (parent, {email, password}, {db}, info) => {
      const user = await axios.post('http://localhost:4000/auth/login', {
        email,
        password
      })
      return user.data
    },
    deleteSnippet: (parent, {id}, {db}, info) =>
      db.models.snippet.destroy({
        where: {
          id: id
        }
      }),
    deleteQuestion: (parent, {id}, {db}, info) =>
      db.models.question.destroy({
        where: {
          id: id
        }
      }),
    deleteProject: (parent, {id}, {db}, info) =>
      db.models.project.destroy({
        where: {
          id: id
        }
      }),
    createSnippet: (parent, {questionId, content, url}, {db}, info) =>
      db.models.snippet.create({
        questionId,
        content,
        url
      }),
    createQuestion: (parent, {projectId, content}, {db}, info) =>
      db.models.question.create({
        projectId,
        content
      }),
    createProject: (parent, {userId, name}, {db}, info) =>
      db.models.project.create({
        userId,
        name
      }),
    createUser: async (
      parent,
      {firstName, lastName, email, password},
      {db},
      info
    ) => {
      const user = await axios.post('http://localhost:4000/auth/signup', {
        firstName,
        lastName,
        email,
        password
      })
      console.log(user.data)
      return user.data
    },
    updateProject: (parent, {id, name}, {db}, info) =>
      db.models.project.update(
        {
          name
        },
        {
          where: {
            id
          }
        }
      ),
    updateQuestion: (parent, {id, content}, {db}, info) =>
      db.models.question.update(
        {
          content
        },
        {
          where: {
            id
          }
        }
      ),
    updateUser: async (
      parent,
      {id, firstName, lastName, email, password},
      {db},
      info
    ) => {
      const user = await db.models.user.findByPk(id)
      console.log(user)
      return user.update({
        firstName,
        lastName,
        email,
        password
      })
    }
  }
}
