import React, {Component} from 'react'

export default class Snippet extends Component {
  render() {
    const snippet = this.props.snippet
    return (
      <div>
        <p>
          {snippet.content}
          <button
            type="button"
            onClick={() => {
              this.props.deleteSnippet(snippet.id)
            }}
          >
            X
          </button>
        </p>
      </div>
    )
  }
}
