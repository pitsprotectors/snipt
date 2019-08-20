import React, {useState, useMemo, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'
import {Navbar} from './components'
import Routes from './routes'
import {useQuery} from '@apollo/react-hooks'
import {Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appContainer: {
    marginTop: '3rem',
    padding: '0 !important'
  }
}))

const App = () => {
  const GET_ME = gql`
    query {
      me {
        id
        firstName
        lastName
        email
      }
    }
  `

  const classes = useStyles()

  const {data, loading, error, refetch} = useQuery(GET_ME)
  const [user, setUser] = useState('')

  useEffect(() => {
    if (data.me) setUser(data.me)
    data.me = null
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>app.js error: {error.message}</p>
  return (
    <Container className={classes.appContainer}>
      <Navbar user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />
    </Container>
  )
}

export default withRouter(App)
