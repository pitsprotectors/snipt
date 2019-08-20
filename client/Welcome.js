import React from 'react'
import {Typography, Container, Button} from '@material-ui/core/'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  welcomeContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
    padding: 0
  },
  welcomeForegroundContainer: {
    zIndex: 5,
    position: 'absolute',
    left: '2%',
    bottom: '30%',
    width: '50% !important',
    height: '55%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeHeader: {
    textAlign: 'center',
    fontWeight: 800,
    marginTop: '2rem',
    lineHeight: '1.2'
  },
  welcomeSubheader: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '20px'
  },
  welcomeLanding: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: -5
  },
  getStartedButton: {
    backgroundColor: '#0c4ca4',
    color: '#FFFFFF',
    width: '12rem',
    marginTop: '2rem'
  },
  getStartedButtonTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 !important'
  },
  getStartedButtonTextHead: {
    fontSize: '18px'
  },
  getStartedButtonTextSub: {
    fontSize: '10px'
  }
}))

const Welcome = () => {
  const classes = useStyles()

  return (
    <Container className={classes.welcomeContainer}>
      <Container className={classes.welcomeForegroundContainer}>
        <Typography variant="h2" className={classes.welcomeHeader}>
          Designed for your curiosity.
        </Typography>
        <Typography variant="body1" className={classes.welcomeSubheader}>
          When learning-obsessed coders work together to create a simple,
          beautiful, yet effective learning tool for everyone. Start your
          journey with a single snippet.
        </Typography>
        <Button className={classes.getStartedButton}>
          <Container className={classes.getStartedButtonTextContainer}>
            <Typography
              variant="body1"
              className={classes.getStartedButtonTextHead}
            >
              Get Started
            </Typography>
            <Typography
              variant="body1"
              className={classes.getStartedButtonTextSub}
            >
              v.1.0.1
            </Typography>
          </Container>
        </Button>
      </Container>
      <img
        src="https://i.imgur.com/ta1VwzY.png"
        alt="logo"
        className={classes.welcomeLanding}
      />
    </Container>
  )
}

export default Welcome
