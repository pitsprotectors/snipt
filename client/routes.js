import React from 'react'
//import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

import {
  Login,
  Signup,
  ProjectList,
  ProjectDetail,
  QuestionDetail
} from './components'

const Routes = ({user, setUser}) => {
  console.log(user)
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route path="/login" render={() => <Login setUser={setUser} />} />
      <Route path="/signup" render={() => <Signup setUser={setUser} />} />
      {user.id && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route
            exact
            path="/projects"
            render={() => <ProjectList user={user} />}
          />
          <Route path="/projects/:projectId" component={ProjectDetail} />
          <Route path="/questions/:questionId" component={QuestionDetail} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route render={() => <Login setUser={setUser} />} />
    </Switch>
  )
}

/**
 * COMPONENT
 */
// class Routes extends Component {
//   render() {
//     return (
//       <Switch>
//         {/* Routes placed here are available to all visitors */}
//         <Route path="/login" render={() => <Login auth={this.props.auth} />} />
//         <Route
//           path="/signup"
//           render={() => <Signup auth={this.props.auth} />}
//         />
//         {this.props.user && (
//           <Switch>
//             {/* Routes placed here are only available after logging in */}
//             <Route
//               exact
//               path="/projects"
//               render={() => <ProjectList user={this.props.user} />}
//             />
//             <Route path="/projects/:projectId" component={ProjectDetail} />
//             <Route path="/questions/:questionId" component={QuestionDetail} />
//           </Switch>
//         )}
//         {/* Displays our Login component as a fallback */}
//         <Route render={() => <Login auth={this.props.auth} />} />
//       </Switch>
//     )
//   }
// }

export default withRouter(Routes)
