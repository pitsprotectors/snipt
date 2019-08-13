import React, {Component} from 'react'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient()
import {Link} from 'react-router-dom'

export default class Project extends Component {
  render() {
    return (
      <div>
        <Link to={`/projects/${this.props.project.id}`}>
          {' '}
          {this.props.project.name}{' '}
        </Link>
        <button
          type="button"
          onClick={() => {
            this.props.deleteProject(this.props.project.id)
          }}
        >
          X
        </button>
      </div>
    )
  }
}
