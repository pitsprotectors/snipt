import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Question extends Component {
  render() {
    return (
      <div>
        <h1>
          {this.props.questionIndex + 1}
          <Link to={`/questions/${this.props.question.id}`}>
            {' '}
            {this.props.question.content}{' '}
          </Link>
          <button
            type="button"
            onClick={() => {
              this.props.deleteQuestion(this.props.question.id)
            }}
          >
            X
          </button>
        </h1>
      </div>
    )
  }
}
