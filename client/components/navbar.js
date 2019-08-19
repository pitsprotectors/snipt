import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'

const Navbar = ({user, setUser}) => {
  const LOGOUT = gql`
    mutation {
      logout
    }
  `

  const [logout, {data, loading, error}] = useMutation(LOGOUT)
  if (loading) return <p>Loading...</p>
  if (error) return <p>navbar ERROR: {error.message}</p>
  return (
    <div>
      <h1>SNIPTS</h1>
      <nav>
        {user.id ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/projects">projects</Link>
            <a
              href="#"
              onClick={() => {
                logout()
                setUser('')
              }}
            >
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
