const Sequelize = require('sequelize')
const db = require('../db')
const CronJob = require('cron').CronJob

const Question = db.define('question', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  show: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Question
//const range = [1,2,3,5,6,11,12,20,21]
const store = {
  1: true,
  2: true,
  3: true,
  5: true,
  6: true,
  11: true,
  12: true,
  20: true,
  21: true
}

const algo = question => {
  let d = new Date()
  let n = d.getTime()
  const create = question.createdAt.getTime()
  const diff = Math.floor((n - create) / 60000)
  if (diff in store) {
    question.show = !question.show
    question.save()
  }
}

Question.afterCreate(question => {
  const job = new CronJob('* * * * * *', () => {
    algo(question)
  })
  job.start()
  let d = new Date()
  let n = d.getTime()
  const create = question.createdAt.getTime()
  const diff = Math.floor((n - create) / 60000)
  if (diff > 22) {
    job.stop()
  }
})
