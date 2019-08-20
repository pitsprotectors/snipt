import React, {Fragment} from 'react'
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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const GET_PROJECTS = gql`
  query lala($userid: ID!) {
    user(id: $userid) {
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
  projectsContainer: {
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
  projectsLanding: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: -5
  },
  card: {
    display: 'flex',
    width: 450,
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
  projectName: {
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

function DeleteProjectDetails({id, refetch}) {
  const classes = useStyles()

  const [deleteProject, {data, loading, error}] = useMutation(DELETE_PROJECT, {
    variables: {id: id}
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>ERROR: {error.message}</p>
  return (
    <Fragment>
      <DeleteForeverIcon
        className={classes.icon}
        fontSize="large"
        onClick={async () => {
          await deleteProject({
            variables: {id}
          })
          refetch()
        }}
      />
    </Fragment>
  )
}

export default function Projects({user}) {
  const classes = useStyles()

  const {data, loading, error, refetch} = useQuery(GET_PROJECTS, {
    variables: {userid: user.id}
  })
  if (loading) return <p>Loading...</p>
  if (error) {
    return <p>ERROR :( {error.message}</p>
  }

  return (
    <Fragment>
      <Container className={classes.welcomeContainer}>
        <Container className={classes.projectsContainer}>
          <Typography variant="h3" className={classes.projectHeader}>
            Your Projects
          </Typography>
          {data.user &&
            data.user.projects.map(project => (
              <Card className={classes.card} key={project.id}>
                <CardContent className={classes.cardContentContainer}>
                  <Link to={`/projects/${project.id}`}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Project Name:
                    </Typography>
                    <Typography
                      className={classes.projectName}
                      variant="h5"
                      component="h2"
                    >
                      {project.name}
                    </Typography>
                  </Link>
                </CardContent>
                <Container className={classes.cardDeleteBtnContainer}>
                  <DeleteProjectDetails id={project.id} refetch={refetch} />
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
