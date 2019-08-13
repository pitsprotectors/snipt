import React, {Component} from 'react'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient()
import {Link} from 'react-router-dom'

export default class Question extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.question.id}</h1>
        <Link to={`/questions/${this.props.question.id}`}>
          {' '}
          {this.props.question.content}{' '}
        </Link>
      </div>
    )
  }
}
