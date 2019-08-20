'use strict'

const db = require('../server/db')
const {User, Project, Question, Snippet} = require('../server/db/models')

const users = [
  {
    email: 'jeongmin@gmail.com',
    password: '123',
    firstName: 'Jeongmin',
    lastName: 'Cho'
  }
]

const questions = [
  {
    content: 'What are React Hooks?',
    projectId: 1
  },
  {
    content: 'Why do we use hooks?',
    projectId: 1
  },
  {
    content: 'How do we call lifecycle methods with hooks?',
    projectId: 1
  },
  {
    content: 'How do we use local state with hooks?',
    projectId: 1
  },
  {
    content: 'Explain how to call componentDidMount with useEffect.',
    projectId: 1
  },
  {
    content: 'How do we use a global state with hooks?',
    projectId: 1
  },
  {
    content: 'Explain how to create a global state with hooks.',
    projectId: 1
  },
  {
    content: 'How do we create custom hooks?',
    projectId: 1
  },
  {
    content: 'What is GraphQL?',
    projectId: 2
  },
  {
    content: 'What problem does GraphQL solve for us?',
    projectId: 2
  },
  {
    content: 'Why was GraphQL made? By who?',
    projectId: 2
  },
  {
    content: 'Explain how to integrate GraphQL with Express.',
    projectId: 2
  },
  {
    content: 'Explain how associations are main in GraphQL.',
    projectId: 2
  },
  {
    content: 'Where are queries made in GraphQL?',
    projectId: 2
  }
]

const snippets = [
  {
    content: 'Pellentesque at nulla.',
    questionId: 1
  },
  {
    content: 'In hac habitasse platea dictumst.',
    questionId: 1
  },
  {
    content: 'Aenean sit amet justo.',
    questionId: 2
  }
]

const projects = [
  {
    id: 1,
    name: 'React Hooks',
    userId: 1
  },
  {
    id: 2,
    name: 'GraphQL (Apollo)',
    userId: 1
  },
  {
    id: 3,
    name: 'Firebase',
    userId: 1
  },
  {
    id: 4,
    name: 'Sorting Algorithms',
    userId: 1
  },
  {
    id: 5,
    name: 'React Native',
    userId: 1
  },
  {
    id: 6,
    name: 'Web Sockets',
    userId: 1
  },
  {
    id: 7,
    name: 'TensorFlowJS',
    userId: 1
  },
  {
    id: 8,
    name: 'Data Structures',
    userId: 1
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    projects.map(project => {
      return Project.create(project)
    })
  )

  await Promise.all(
    questions.map(question => {
      return Question.create(question)
    })
  )

  await Promise.all(
    snippets.map(snippet => {
      return Snippet.create(snippet)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
