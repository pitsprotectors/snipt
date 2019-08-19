import React, {useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

const Signup = ({setUser}) => {
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const SIGNUP = gql`
    mutation Signup(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      createUser(
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      ) {
        user {
          id
          email
          firstName
          lastName
        }
      }
    }
  `

  const [signup, {data, loading, error}] = useMutation(SIGNUP)

  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const result = await signup({
            variables: {firstName, lastName, email, password}
          })
          console.log('BEFORE SET THE USER')
          setUser(result.data.createUser.user)
          console.log('AFTER SET THE USER')
        }}
      >
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input
            name="firstName"
            type="text"
            onChange={e => {
              setFirstName(e.target.value)
            }}
          />
        </div>

        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input
            name="lastName"
            type="text"
            onChange={e => {
              setLastName(e.target.value)
            }}
          />
        </div>

        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input
            name="email"
            type="text"
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          {email}
        </div>

        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            name="password"
            type="password"
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          {password}
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <a href="/auth/google">Signup with Google</a>
    </div>
  )
}

export default Signup
