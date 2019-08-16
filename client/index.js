import React from 'react'
import ReactDOM from 'react-dom'
//import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'

const cache = new InMemoryCache()
const link = new HttpLink({
  credentials: 'same-origin'
})
const client = new ApolloClient({link, cache})

// establishes socket connection
// import './socket'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
)
