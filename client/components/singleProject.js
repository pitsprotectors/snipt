import React, {Component} from 'react'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import Question from './question'
const client = new ApolloClient()

export default class SingleProject extends Component {
  constructor() {
    super()
    this.state = {projectName: '', questions: []}
    this.deleteQuestion = this.deleteQuestion.bind(this)
  }
  async componentDidMount() {
    const query = gql`
    query {
      project(id: ${this.props.match.params.id}){
        name
        questions {
          id
          content
        }
      }
    }
  `
    const results = await client.query({query})
    this.setState({
      projectName: results.data.project.name,
      questions: results.data.project.questions
    })
  }

  async deleteQuestion(id) {
    const mutation = gql`
        mutation{
            deleteQuestion(id: ${id})
        }
    `
    await client.mutate({mutation})
    const copy = this.state.questions
    this.setState({
      questions: copy.filter(question => {
        return question.id !== id
      })
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.projectName}</h2>
        {this.state.questions &&
          this.state.questions.map((question, index) => {
            return (
              <Question
                key={question.id}
                question={question}
                questionIndex={index}
                deleteQuestion={this.deleteQuestion}
              />
            )
          })}
      </div>
    )
  }
}
