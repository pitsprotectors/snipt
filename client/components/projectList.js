import React, {Component} from 'react'
import Project from './project'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient()
const query = gql`
  query {
    user(id: 1) {
      projects {
        name
        id
      }
    }
  }
`

export default class ProjectList extends Component {
  constructor() {
    super()
    this.state = {projects: []}
  }
  async componentDidMount() {
    const results = await client.query({query})
    console.log(results)
    this.setState({projects: results.data.user.projects})
  }
  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.projects &&
          this.state.projects.map(project => {
            return <Project key={project.id} project={project} />
          })}
      </div>
    )
  }
}
