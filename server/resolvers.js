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
    projects: (parent, args, {db}) => db.models.project.findAll(),
    users: (parent, args, {db}) => db.models.user.findAll(),
    project: (parent, {id}, {db}) => db.models.project.findByPk(id),
    user: (parent, {id}, {db}) => db.models.user.findByPk(id),
    questions: (parent, args, {db}) => db.models.question.findAll(),
    snippets: (parent, args, {db}) => db.models.snippet.findAll(),
    question: (parent, {id}, {db}) => db.models.question.findByPk(id),
    snippet: (parent, {id}, {db}) => db.models.snippet.findByPk(id)
  },
  Mutation: {
    deleteSnippet: (parent, {id}, {db}) => {
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
    createSnippet: (parent, {questionId, content, url}, {db}) =>
      db.models.snippet.create({
        questionId,
        content,
        url
      }),
    createQuestion: (parent, {projectId, content}, {db}) =>
      db.models.question.create({
        projectId,
        content
      }),
    createProject: (parent, {userId, name}, {db}) =>
      db.models.project.create({
        userId,
        name
      }),
    createUser: (parent, {firstName, lastName, email, password}, {db}) =>
      db.models.user.create({
        firstName,
        lastName,
        email,
        password
      }),
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
