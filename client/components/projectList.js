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
      <Table columns={3} inverted celled selectable color="teal">
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan="3">
              <Link to="/projects" style={{color: '#FFF'}}>
                <Header as="h3" style={{color: '#FFF'}}>
                  Projects!
                </Header>
              </Link>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.user.projects &&
            data.user.projects.map((project, index) => (
              <div key={project.id}>
                <Link to={`/projects/${project.id}`} style={{color: '#FFF'}}>
                  <Table.Row>
                    <Table.Cell width={1}>{index + 1}</Table.Cell>
                    <Table.Cell width={15}>{project.name}</Table.Cell>
                    <Table.Cell width={4}>
                      <DeleteProjectDetails id={project.id} refetch={refetch} />
                    </Table.Cell>
                  </Table.Row>
                </Link>
              </div>
            ))}
        </Table.Body>
      </Table>
    </Fragment>
  )
}
