import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'

import {
  Login,
  Signup,
  ProjectList,
  ProjectDetail,
  QuestionDetail
} from './components'

import Welcome from './Welcome'

const Routes = ({user, setUser}) => {
  return (
    <Switch>
      {/* NOT LOGGED IN ROUTES */}
      <Route path="/login" render={() => <Login setUser={setUser} />} />
      <Route
        exact
        path="/projects"
        render={() => <ProjectList user={user} />}
      />
      <Route
        exact
        path="/projects"
        render={() => <ProjectList user={user} />}
      />
      <Route exact path="/projects/:projectId" component={ProjectDetail} />
      <Route exact path="/questions/:questionId" component={QuestionDetail} />
      <Route path="/signup" render={() => <Signup setUser={setUser} />} />
      <Route exact path="/" component={Welcome} />
      {user && (
        <Switch>
          {/* LOGGED IN ROUTES */}
          <Route
            exact
            path="/projects"
            render={() => <ProjectList user={user} />}
          />
          <Route exact path="/projects/:projectId" component={ProjectDetail} />
          <Route
            exact
            path="/questions/:questionId"
            component={QuestionDetail}
          />
        </Switch>
      )}
      {/* FALLBACK */}
      <Route render={() => <Login setUser={setUser} />} />
    </Switch>
  )
}

export default withRouter(Routes)
