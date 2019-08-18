import React, {Fragment} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import {Button, Table, Header} from 'semantic-ui-react'

const GET_PROJECTS = gql`
  query projectList {
    user(id: 1) {
      projects {
        id
        name
      }
    }
  }
`

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`

function DeleteProjectDetails({id, refetch}) {
  const [deleteProject, {data, loading, error}] = useMutation(DELETE_PROJECT)
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <Button
        type="button"
        onClick={async () => {
          await deleteProject({
            variables: {id}
          })
          refetch()
        }}
      >
        DELETE
      </Button>
    </Fragment>
  )
}

export default function Projects() {
  const {data, loading, error, refetch} = useQuery(GET_PROJECTS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR :(</p>

  return (
    <Fragment>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">
              <Link to="/projects">
                <Header as="h3">Projects!</Header>
              </Link>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.user.projects &&
            data.user.projects.map(project => (
              <div key={project.id}>
                <Table.Row>
                  <Table.Cell>
                    <Link to={`/projects/${project.id}`}>
                      <div>
                        {project.name} {project.id}
                      </div>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <DeleteProjectDetails id={project.id} refetch={refetch} />
                  </Table.Cell>
                </Table.Row>
              </div>
            ))}
        </Table.Body>
      </Table>
    </Fragment>
  )
}
