import React, {Fragment, useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import {Button, Table, Form, Header, TextArea} from 'semantic-ui-react'
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
      <Button
        type="button"
        onClick={async () => {
          await deleteSnippet({
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

function UpdateQuestionDetails({id}) {
  const [content, setContent] = useState('')
  const [updateProject, {data, loading, error}] = useMutation(
    UPDATE_QUESTION_DETAILS
  )
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <Form
        onSubmit={e => {
          e.preventDefault()
          updateProject({
            variables: {id, content}
          })
        }}
      >
        <TextArea
          onChange={e => {
            setContent(e.target.value)
          }}
        />
        <Button type="submit" />
      </Form>
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
      <Table columns={3} inverted celled selectable color="teal">
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan="3">
              <Header as="h3" style={{color: '#FFF'}}>
                {data.question.content}
              </Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body width={20}>
          <Table.Row textAlign="center">
            <UpdateQuestionDetails id={data.question.id} />
          </Table.Row>
          {data.question.snippets.map((snippet, index) => (
            <div key={snippet.id}>
              <Table.Row>
                <Table.Cell width={1}>{index + 1}</Table.Cell>
                <Table.Cell width={15}>{snippet.content}</Table.Cell>
                <Table.Cell width={4}>
                  <DeleteSnippetDetails id={snippet.id} refetch={refetch} />
                </Table.Cell>
              </Table.Row>
            </div>
          ))}
        </Table.Body>
      </Table>
    </Fragment>
  )
}
