import React, {Fragment} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'

const GET_PROJECTS = gql`
  query me {
    projects {
      id
      name
    }
  }
`

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`

// export default class ProjectList extends Component {
//   constructor() {
//     super()
//     this.state = {projects: []}
//     this.deleteProject = this.deleteProject.bind(this)
//   }
//   async componentDidMount() {
//     console.log('\n\n\n\n this.props.user.id:', this.props.user.id)
//     if (this.props.user.id) {
//       const query = gql`
//         query {
//           user(id: ${this.props.user.id}) {
//             projects {
//               name
//               id
//             }
//           }
//         }
//       `
//       const results = await client.query({query})
//       this.setState({projects: results.data.user.projects})
//     }
//   }
//   componentDidUpdate() {
//     console.log('/n/n/n componenet did updata:', this.props.user)
//   }

function DeleteProjectDetails({id, refetch}) {
  const [deleteProject, {data, loading, error}] = useMutation(DELETE_PROJECT)
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <button
        type="button"
        onClick={async () => {
          await deleteProject({
            variables: {id}
          })
          refetch()
        }}
      >
        DELETE
      </button>
    </Fragment>
  )
}

export default function Projects() {
  const {data, loading, error, refetch} = useQuery(GET_PROJECTS)
  if (loading) return <p>Loading...</p>
  if (error) {
    return <p>ERROR :(</p>
  }
  return (
    <Fragment>
      {data &&
        data.projects.map(project => (
          <div key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <div>
                {project.name} {project.id}
              </div>
            </Link>
            <DeleteProjectDetails id={project.id} refetch={refetch} />
          </div>
        ))}
    </Fragment>
  )
}
