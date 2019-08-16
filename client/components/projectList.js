import React, {Component} from 'react'
import Project from './project'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient()

export default class ProjectList extends Component {
  constructor() {
    super()
    this.state = {projects: []}
    this.deleteProject = this.deleteProject.bind(this)
  }
  async componentDidMount() {
    const query = gql`
      query {
        user(id: ${this.props.user.id}) {
          projects {
            name
            id
          }
        }
      }
    `
    try {
      const results = await client.query({query})
      this.setState({projects: results.data.user.projects})
    } catch (error) {
      console.error(error)
    }
  }

  async deleteProject(id) {
    const mutation = gql`
        mutation{
          deleteProject(id: ${id})
        }
    `
    try {
      await client.mutate({mutation})
      const copy = this.state.projects
      this.setState({
        projects: copy.filter(project => {
          return project.id !== id
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        {this.state.projects &&
          this.state.projects.map(project => {
            return (
              <Project
                key={project.id}
                project={project}
                deleteProject={this.deleteProject}
              />
            )
          })}
      </div>
    )
  }
}
