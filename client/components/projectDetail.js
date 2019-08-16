import React, {Fragment, useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'

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
      <button
        type="button"
        onClick={async () => {
          await deleteQuestion({
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

function UpdateProjectDetails({id}) {
  const [name, setName] = useState('')
  const [updateProject, {data, loading, error}] = useMutation(
    UPDATE_PROJECT_DETAILS
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <form
        onSubmit={e => {
          e.preventDefault()
          updateProject({
            variables: {id, name}
          })
        }}
      >
        <input
          type="text"
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <input type="submit" />
      </form>
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
      <h2>{data.project.name}</h2>
      <UpdateProjectDetails id={data.project.id} />
      {data.project.questions.map(question => (
        <div key={question.id}>
          <Link to={`/questions/${question.id}`}>
            <div>
              {question.content} {question.id}
            </div>
          </Link>
          <DeleteQuestionDetails id={question.id} refetch={refetch} />
        </div>
      ))}
    </Fragment>
  )
}
