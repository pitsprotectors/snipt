import React, {Fragment, useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const GET_QUESTION_DETAILS = gql`
  query GetQuestionDetails($questionId: ID!) {
    question(id: $questionId) {
      id
      content
      snippets {
        id
        content
      }
    }
  }
`

export const UPDATE_QUESTION_DETAILS = gql`
  mutation UpdateQuestionDetails($id: ID!, $content: String!) {
    updateQuestion(id: $id, content: $content) {
      id
      content
    }
  }
`

const DELETE_SNIPPET = gql`
  mutation DeleteSnippet($id: ID!) {
    deleteSnippet(id: $id)
  }
`

function DeleteSnippetDetails({id, refetch}) {
  const [deleteSnippet, {data, loading, error}] = useMutation(DELETE_SNIPPET)
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <button
        type="button"
        onClick={async () => {
          await deleteSnippet({
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

function UpdateQuestionDetails({id}) {
  const [content, setContent] = useState('')
  const [updateProject, {data, loading, error}] = useMutation(
    UPDATE_QUESTION_DETAILS
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <form
        onSubmit={e => {
          e.preventDefault()
          updateProject({
            variables: {id, content}
          })
        }}
      >
        <input
          type="text"
          onChange={e => {
            setContent(e.target.value)
          }}
        />
        <input type="submit" />
      </form>
    </Fragment>
  )
}

export default function QuestionDetail({match}) {
  const {data, loading, error, refetch} = useQuery(GET_QUESTION_DETAILS, {
    variables: {questionId: match.params.questionId}
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <h2>{data.question.content}</h2>
      <UpdateQuestionDetails id={data.question.id} />
      {data.question.snippets.map(snippet => (
        <div key={snippet.id}>
          <div>
            {snippet.content} {snippet.id}
          </div>
          <DeleteSnippetDetails id={snippet.id} refetch={refetch} />
        </div>
      ))}
    </Fragment>
  )
}
