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
  },
  startTime: {
    type: Sequelize.DATE
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

const algo = (question, bin) => {
  let d = new Date()
  let n = d.getTime()
  const change = Math.floor((n - question.startTime.getTime()) / 6000)
  if (change in store) {
    if (!(change in bin)) {
      bin[change] = true
      question.show = !question.show
      question.save()
    }
  }
}

Question.afterCreate(question => {
  question.startTime = question.createdAt
  question.save()
  let bin = {}
  const job = new CronJob('* * * * * *', () => {
    algo(question, bin)
  })
  job.start()
  let d = new Date()
  let n = d.getTime()
  const diff = Math.floor((n - question.startTime.getTime()) / 6000)
  if (diff > 25) {
    job.stop()
    return 1
  }
})
