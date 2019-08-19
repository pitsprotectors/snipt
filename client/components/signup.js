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
      {/* <a href="/auth/google">Login with Google</a> */}
    </div>
  )
}

export default Signup

// /**
//  * COMPONENT
//  */
// export default class SignUp extends Component {
//   constructor(props) {
//     super(props)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   async handleSubmit(evt) {
//     evt.preventDefault()
//     console.log('fn', evt.target.firstName.value)
//     const mutation = gql`
//       mutation {
//         createUser(firstName:"${evt.target.firstName.value}", lastName:"${
//       evt.target.lastName.value
//     }", email:"${evt.target.email.value}", password:"${
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
//     console.log(result)
//     this.props.auth(result.data.createUser)
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
//             <label htmlFor="firstName">
//               <small>firstName</small>
//             </label>
//             <input name="firstName" type="text" />
//           </div>
//           <div>
//             <label htmlFor="lastName">
//               <small>lastName</small>
//             </label>
//             <input name="lastName" type="text" />
//           </div>
//           <div>
//             <label htmlFor="password">
//               <small>Password</small>
//             </label>
//             <input name="password" type="password" />
//           </div>
//           <div>
//             <button type="submit">Signup</button>
//           </div>
//         </form>
//         <a href="/auth/google">Signup with Google</a>
//       </div>
//     )
//   }
// }

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error
//   }
// }
//MIGHT BE USEFULLLLL==>{error && error.response && <div> {error.response.data} </div>}

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(auth(email, password, formName))
//     }
//   }
// }
