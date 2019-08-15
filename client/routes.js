import React, {Component} from 'react'
//import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

import {
  Login,
  Signup,
  UserHome,
  ProjectList,
  SingleProject,
  SingleQuestion
} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" render={() => <Login auth={this.props.auth} />} />
        <Route
          path="/signup"
          render={() => <Signup auth={this.props.auth} />}
        />
        {this.props.user && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route
              exact
              path="/projects"
              render={() => <ProjectList user={this.props.user} />}
            />
            <Route path="/projects/:id" component={SingleProject} />
            <Route path="/questions/:id" component={SingleQuestion} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route render={() => <Login auth={this.props.auth} />} />
      </Switch>
    )
  }
}

export default withRouter(Routes)
