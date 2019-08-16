import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient()
import {Navbar} from './components'
import Routes from './routes'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {user: ''}
    this.auth = this.auth.bind(this)
    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    const query = gql`
      query {
        me {
          id
          firstName
          lastName
          email
        }
      }
    `
    console.log('before query')
    const user = await client.query({query})
    // console.log(result)
    // const user = await axios.get('/auth/me')
    //console.log(user.data)
    //return user.data
    if (user.data) {
      this.setState({user: user.data.me})
    } else {
      this.setState({user: null})
    }
  }

  auth(user) {
    this.setState({user: user})
    console.log('autth:', this.state.user)
  }

  async logout() {
    const mutation = gql`
      mutation {
        logout
      }
    `
    const result = await client.mutate({mutation})
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
