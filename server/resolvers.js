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
    me: async (parent, args, {req}, info) => {
      console.log('THIS IS THE ME RESOLVER: ', req.headers)
      //console.log("req.headers:", req.headers)
      // const user = await axios.get("http://localhost:4000/auth/me",{
      //   headers:req.headers
      // })
      // console.log("\n\n\n\n\n\n\n\n\n me resolver:",user.data)
      return req.user
    }
  },
  Mutation: {
    login: async (parent, {email, password}, {req}, info) => {
      const user = await axios.post(
        'http://localhost:4000/auth/login',
        {
          email,
          password
        },
        {
          headers: req.headers
        }
      )
      //console.log("login user data:", user.data)
      return user.data
    },
    logout: async (parent, args, {req}, info) => {
      const result = await axios.post('http://localhost:4000/auth/logout', {
        headers: req.headers
      })
      return result.status
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
      {db},
      info
    ) => {
      const user = await axios.post('http://localhost:4000/auth/signup', {
        firstName,
        lastName,
        email,
        password
      })
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
