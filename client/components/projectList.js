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
    console.log('\n\n\n\n this.props.user.id:', this.props.user.id)
    if (this.props.user.id) {
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
      const results = await client.query({query})
      this.setState({projects: results.data.user.projects})
    }
  }
  componentDidUpdate() {
    console.log('/n/n/n componenet did updata:', this.props.user)
  }

  async deleteProject(id) {
    const mutation = gql`
        mutation{
          deleteProject(id: ${id})
        }
    `
    await client.mutate({mutation})
    const copy = this.state.projects
    this.setState({
      projects: copy.filter(project => {
        return project.id !== id
      })
    })
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
