import React, {Component} from 'react'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import Snippet from './snippet'
const client = new ApolloClient()

export default class SingleQuestion extends Component {
  constructor() {
    super()
    this.state = {questionName: '', snippets: []}
    this.deleteSnippet = this.deleteSnippet.bind(this)
  }

  async componentDidMount() {
    const query = gql`
            query {
                question(id: ${this.props.match.params.id}){
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
      questionName: results.data.question.content,
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

  render() {
    return (
      <div>
        <h2>{this.state.questionName}</h2>
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
