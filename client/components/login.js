import React, {useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

const Login = ({setUser}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        email
        firstName
        lastName
      }
    }
  `

  const [login, {data, loading, error}] = useMutation(LOGIN)
  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const result = await login({variables: {email, password}})
          console.log('BEFORE SET THE USER')
          setUser(result.data.login)
          console.log('AFTER SET THE USER')
        }}
      >
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
      {/* <a href="/auth/google">Login with Google</a> */}
    </div>
  )
}

export default Login

/**
 * COMPONENT
 */
// export default class Login extends Component {
//   constructor(props) {
//     super(props)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   async handleSubmit(evt) {
//     evt.preventDefault()
//     // console.log(evt.target.email)
//     const mutation = gql`
//       mutation {
//         login(email:"${evt.target.email.value}", password:"${
//       evt.target.password.value
//     }"){
//           id
//           email
//           firstName
//           lastName
//         }
//       }
//     `
//     const result = await client.mutate({mutation})
//     console.log(result.data)
//     this.props.auth(result.data.login)
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit} name={name}>
//           <div>
//             <label htmlFor="email">
//               <small>Email</small>
//             </label>
//             <input name="email" type="text" />
//           </div>
//           <div>
//             <label htmlFor="password">
//               <small>Password</small>
//             </label>
//             <input name="password" type="password" />
//           </div>
//           <div>
//             <button type="submit">Login</button>
//           </div>
//         </form>
//         <a href="/auth/google">Login with Google</a>
//       </div>
//     )
//   }
// }
