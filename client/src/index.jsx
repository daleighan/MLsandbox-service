import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Handwriting extends Component {
	constructor(props) {
		super(props)
	}

	render = () => {
		return (
			<div>
				<div>Hello World</div>
			</div>
		)
	}
}

ReactDOM.render(<Handwriting />, document.getElementById('app'))