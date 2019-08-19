import React, {Fragment, useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import {Input, Button, Table, Form, TextArea} from 'semantic-ui-react'

export const GET_PROJECT_DETAILS = gql`
  query GetProjectDetails($projectId: ID!) {
    project(id: $projectId) {
      id
      name
      questions {
        id
        content
      }
    }
  }
`

export const UPDATE_PROJECT_DETAILS = gql`
  mutation UpdateProjectDetails($id: ID!, $name: String!) {
    updateProject(id: $id, name: $name) {
      id
      name
    }
  }
`

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id)
  }
`

function DeleteQuestionDetails({id, refetch}) {
  const [deleteQuestion, {data, loading, error}] = useMutation(DELETE_QUESTION)
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <Button
        type="button"
        onClick={async () => {
          await deleteQuestion({
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

function UpdateProjectDetails({id}) {
  const [name, setName] = useState('')
  const [updateProject, {data, loading, error}] = useMutation(
    UPDATE_PROJECT_DETAILS
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <Form
        onSubmit={e => {
          e.preventDefault()
          updateProject({
            variables: {id, name}
          })
        }}
      >
        <Input
          type="text"
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <Button> Change your Question here! </Button>
      </Form>
    </Fragment>
  )
}

export default function ProjectDetail({match}) {
  const {data, loading, error, refetch} = useQuery(GET_PROJECT_DETAILS, {
    variables: {projectId: match.params.projectId}
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <Table columns={3} inverted celled selectable color="teal">
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan="2">{data.project.name}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={20} textAlign="center">
              <UpdateProjectDetails id={data.project.id} />
            </Table.Cell>
          </Table.Row>
          {data.project.questions.map((question, index) => (
            <div key={question.id}>
              <Link to={`/questions/${question.id}`} style={{color: '#FFF'}}>
                <Table.Row>
                  <Table.Cell width={1}>{index + 1}</Table.Cell>
                  <Table.Cell width={15}>{question.content}</Table.Cell>
                  <Table.Cell width={4}>
                    <DeleteQuestionDetails id={question.id} refetch={refetch} />
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
