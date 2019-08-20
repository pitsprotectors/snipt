import React, {Fragment, useState} from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import {
  Typography,
  Container,
  Button,
  Card,
  CardContent
} from '@material-ui/core/'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  welcomeContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 important!',
    margin: '0 important!',
    marginTop: '2rem',
    width: '100%'
  },
  questionsContainer: {
    zIndex: 5,
    position: 'absolute',
    left: '2%',
    top: '27%',
    width: '50% !important',
    height: '55%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 important!'
  },
  projectHeader: {
    textAlign: 'center',
    fontWeight: 800,
    marginTop: '2rem',
    lineHeight: '1.2',
    marginBottom: '2rem',
    fontSize: '4rem'
  },
  questionsLanding: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: -5
  },
  card: {
    display: 'flex',
    width: 800,
    minHeight: '6rem',
    margin: '.5rem'
  },
  cardContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%'
  },
  cardDeleteBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '10%',
    padding: 0
  },
  questionName: {
    color: '#000000',
    fontSize: '1.5rem'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: '1.2rem'
  },
  pos: {
    marginBottom: 12
  },
  icon: {
    size: '5rem'
  }
}))

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
  const classes = useStyles()

  const {data, loading, error, refetch} = useQuery(GET_PROJECT_DETAILS, {
    variables: {projectId: match.params.projectId}
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  console.log(data.project.questions)
  return (
    <Fragment>
      <Container className={classes.welcomeContainer}>
        <Container className={classes.questionsContainer}>
          <Typography variant="h3" className={classes.projectHeader}>
            {data.project.name}
          </Typography>{' '}
          {/* <UpdateProjectDetails id={data.project.id} /> */}
          {data.project.questions.map(question => (
            <Card className={classes.card} key={question.id}>
              <CardContent className={classes.cardContentContainer}>
                <Link to={`/questions/${question.id}`}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Question:
                  </Typography>
                  <Typography
                    className={classes.questionName}
                    variant="h5"
                    component="h2"
                  >
                    {question.content}
                  </Typography>
                </Link>
              </CardContent>
              <Container className={classes.cardDeleteBtnContainer}>
                <DeleteQuestionDetails id={question.id} refetch={refetch} />
              </Container>
            </Card>
          ))}
        </Container>

        <img
          src="
        https://i.imgur.com/dvxAm3L.png"
          alt="logo"
          className={classes.projectsLanding}
        />
      </Container>
    </Fragment>
  )
}
