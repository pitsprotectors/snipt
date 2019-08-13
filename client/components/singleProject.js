import React, {Component} from 'react'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import Question from './question'
const client = new ApolloClient()

export default class SingleProject extends Component {
  constructor() {
    super()
    this.state = {projectName: '', questions: []}
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
  render() {
    return (
      <div>
        <h2>{this.state.projectName}</h2>
        {this.state.questions &&
          this.state.questions.map(question => {
            return <Question key={question.id} question={question} />
          })}
      </div>
    )
  }
}
