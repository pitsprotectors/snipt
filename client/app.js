import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient()
import {Navbar} from './components'
import Routes from './routes'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {user: ''}
    this.auth = this.auth.bind(this)
    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    const mutation = gql`
      mutation {
        me {
          id
        }
      }
    `
    console.log('before query')
    const result = await client.mutate({mutation})
    console.log(result)
    if (result) {
      this.setState({user: result})
    } else {
      this.setState({user: {}})
    }
  }

  auth(user) {
    this.setState({user: user})
    console.log('state.user', this.state.user)
  }

  async logout() {
    const mutation = gql`
      mutation {
        logout
      }
    `
    console.log('before query')
    const result = await client.mutate({mutation})
    console.log(result)
    this.setState({user: ''})
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.user} auth={this.auth} logout={this.logout} />
        <Routes user={this.state.user} auth={this.auth} />
      </div>
    )
  }
}

export default withRouter(App)
