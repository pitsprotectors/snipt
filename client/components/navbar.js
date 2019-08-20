import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import {Container, Typography} from '@material-ui/core'
import LinkMui from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  logo: {
    width: '10rem'
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  navbarLink: {
    textDecoration: 'none',
    color: 'black',
    margin: '1.5rem'
  },
  navbarLinkTypography: {
    fontSize: '25px'
  }
}))

const Navbar = ({user, setUser}) => {
  const LOGOUT = gql`
    mutation {
      logout
    }
  `
  const classes = useStyles()

  const [logout, {data, loading, error}] = useMutation(LOGOUT)
  if (loading) return <p>Loading...</p>
  if (error) return <p>navbar ERROR: {error.message}</p>
  //console.log("nbar",user)
  return (
    <Container className={classes.navbarContainer}>
      <Link to="/">
        <img
          src="https://i.imgur.com/wM1N747.png"
          alt="logo"
          className={classes.logo}
        />{' '}
      </Link>
      <nav>
        {user.id ? (
          <Container>
            <LinkMui
              component={Link}
              to="/about"
              className={classes.navbarLink}
            >
              <Typography className={classes.navbarLinkTypography}>
                About Us
              </Typography>
            </LinkMui>
            {/* The navbar will show these links after you log in */}
            <LinkMui
              component={Link}
              to="/projects"
              className={classes.navbarLink}
            >
              <Typography className={classes.navbarLinkTypography}>
                Projects
              </Typography>
            </LinkMui>
            <a
              href="#"
              onClick={() => {
                logout()
                console.log(user, 'user to delete')
                setUser('')
                console.log(user)
              }}
              className={classes.navbarLink}
            >
              <Typography className={classes.navbarLinkTypography}>
                Logout
              </Typography>
            </a>
          </Container>
        ) : (
          <Container>
            {/* The navbar will show these links before you log in */}
            <LinkMui
              component={Link}
              to="/about"
              className={classes.navbarLink}
            >
              <Typography className={classes.navbarLinkTypography}>
                About Us
              </Typography>
            </LinkMui>
            <LinkMui
              component={Link}
              to="/login"
              className={classes.navbarLink}
            >
              <Typography className={classes.navbarLinkTypography}>
                Login
              </Typography>
            </LinkMui>
            <LinkMui
              component={Link}
              to="/signup"
              className={classes.navbarLink}
            >
              <Typography className={classes.navbarLinkTypography}>
                Sign Up
              </Typography>
            </LinkMui>
          </Container>
        )}
      </nav>
    </Container>
  )
}

export default Navbar
