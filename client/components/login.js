import React, {Component} from 'react'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient()

/**
 * COMPONENT
 */
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    console.log(evt.target.email)
    const mutation = gql`
      mutation {
        login(email:"${evt.target.email.value}", password:"${
      evt.target.password.value
    }"){
          id
          email
          firstName
          lastName
        }
      }
    `
    const result = await client.mutate({mutation})
    this.props.auth(result.data.login)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <a href="/auth/google">Login with Google</a>
      </div>
    )
  }
}
