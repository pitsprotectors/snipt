import React, {Component} from 'react'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import Question from './question'
const client = new ApolloClient()

export default class SingleProject extends Component {
  constructor() {
    super()
    this.state = {project: {}, questions: [], newProjectName: ''}
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.changeProjectName = this.changeProjectName.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  async componentDidMount() {
    const query = gql`
    query {
      project(id: ${this.props.match.params.id}){
        id
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
      project: results.data.project,
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

  async changeProjectName(event) {
    event.preventDefault()
    const mutation = gql`
    mutation{
        updateProject(id: ${this.state.project.id}, name: "${
      this.state.newProjectName
    }"){id
    name}
    }
`
    const {data} = await client.mutate({mutation})
    this.setState({
      project: data.updateProject
    })
  }

  handleInputChange(event) {
    this.setState({
      newProjectName: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.project.name}</h2>
        <form onSubmit={this.changeProjectName}>
          <label>Update Project Name:</label>
          <input
            type="text"
            value={this.state.newProjectName}
            onChange={this.handleInputChange}
          />
          <input type="submit" />
        </form>
        <h3>QUESTIONS:</h3>
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
