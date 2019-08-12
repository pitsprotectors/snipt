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
    projects: (parent, args, {db}, info) => db.Project.findAll(),
    users: (parent, args, {db}, info) => db.User.findAll(),
    project: (parent, {id}, {db}, info) => db.project.findByPk(id),
    user: (parent, {id}, {db}, info) => db.user.findByPk(id),
    questions: (parent, args, {db}, info) => db.question.findAll(),
    snippets: (parent, args, {db}, info) => db.snippet.findAll(),
    question: (parent, {id}, {db}, info) => db.question.findByPk(id),
    snippet: (parent, {id}, {db}, info) => db.snippet.findByPk(id)
  }
}
