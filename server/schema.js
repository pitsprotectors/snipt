module.exports = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    googleId: String
    projects: [Project!]!
  }
  type Project {
    id: ID!
    name: String!
    userId: ID!
    user: User!
    questions: [Question!]!
  }
  type Question {
    id: ID!
    content: String!
    projectId: ID!
    project: Project!
    snippets: [Snippet!]!
  }
  type Snippet {
    id: ID!
    content: String!
    url: String!
    questionId: ID!
    question: Question!
  }
  type Query {
    user(id: ID!): User
    users: [User!]!
    project(id: ID!): Project
    projects: [Project!]!
    question(id: ID!): Question
    questions: [Question!]!
    snippet(id: ID!): Snippet
    snippets: [Snippet!]!
  }
  type Mutation {
    deleteSnippet(id: ID!): Int!
    deleteQuestion(id: ID!): Int!
    deleteProject(id: ID!): Int!
    createSnippet(questionId: ID!, content: String!, url: String!): Snippet!
    createQuestion(projectId: ID!, content: String!): Question!
    createProject(userId: ID!, name: String!): Project!
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
    updateProject(id: ID! name: String!): [Int!]!
    updateQuestion(id: ID! content: String!): [Int!]!
    updateUser(id: ID!, firstName: String!, lastName: String!, email: String!, password: String!): User!
  }
`