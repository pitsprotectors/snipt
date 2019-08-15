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
  }

  async componentDidMount() {
    const query = gql`
      query {
        me {
          firstName
        }
      }
    `
    const result = await client.query({query})
    console.log(result)
    this.setState({user: result})
  }

  auth(user) {
    this.setState({user: user})
    console.log('state.user', this.state.user)
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.user} auth={this.auth} />
        <Routes user={this.state.user} auth={this.auth} />
      </div>
    )
  }
}

export default withRouter(App)
