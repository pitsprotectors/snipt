import React, {Component} from 'react'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import Snippet from './snippet'
const client = new ApolloClient()

export default class SingleQuestion extends Component {
  constructor() {
    super()
    this.state = {question: {}, snippets: [], newQuestionContent: ''}
    this.deleteSnippet = this.deleteSnippet.bind(this)
    this.changeQuestionContent = this.changeQuestionContent.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async componentDidMount() {
    const query = gql`
            query {
                question(id: ${this.props.match.params.id}){
                  id
                    content
                    snippets {
                        id
                        content
                    }
                }
            }
        `
    const results = await client.query({query})
    this.setState({
      question: results.data.question,
      snippets: results.data.question.snippets
    })
  }

  async deleteSnippet(id) {
    const mutation = gql`
            mutation{
                deleteSnippet(id: ${id})
            }
        `
    await client.mutate({mutation})
    const copy = this.state.snippets
    this.setState({
      snippets: copy.filter(snippet => {
        return snippet.id !== id
      })
    })
  }

  async changeQuestionContent(event) {
    event.preventDefault()
    const mutation = gql`
    mutation{
        updateQuestion(id: ${this.state.question.id}, content: "${
      this.state.newQuestionContent
    }"){id
    content}
    }
`
    const {data} = await client.mutate({mutation})
    this.setState({
      question: data.updateQuestion
    })
  }

  handleInputChange(event) {
    this.setState({
      newQuestionContent: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.question.content}</h2>
        <form onSubmit={this.changeQuestionContent}>
          <label>Update Question:</label>
          <input
            type="text"
            value={this.state.newQuestionContent}
            onChange={this.handleInputChange}
          />
          <input type="submit" />
        </form>
        <h3>SNIPPETS:</h3>
        {this.state.snippets &&
          this.state.snippets.map((snippet, index) => {
            return (
              <Snippet snippet={snippet} deleteSnippet={this.deleteSnippet} />
            )
          })}
      </div>
    )
  }
}
