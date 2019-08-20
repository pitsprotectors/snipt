import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import history from './history'
import App from './app'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const cache = new InMemoryCache()
const link = new createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
})
const client = new ApolloClient({link, cache})

// custom Material UI theme to be provided to entire app
const appMuiTheme = createMuiTheme({
  typography: {
    primary: {
      main: 'proxima-nova'
    },
    fontFamily: '"Lexend Deca", "Roboto", "Helvetica", "Arial", "sans-serif"',
    fontSize: 14
  }
})

document.body.style.margin = 0

ReactDOM.render(
  <MuiThemeProvider theme={appMuiTheme}>
    <ApolloProvider client={client}>
      <Router history={history}>
        <App />
      </Router>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
