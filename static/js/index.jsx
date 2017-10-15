import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DrawableCanvas from 'react-drawable-canvas'
import Axios from 'axios'

class Handwriting extends Component {
	constructor(props) {
		super(props)
		this.state = {
      isArtist: false,
      styles: {
      	backgroundColor: 'white',
      	width: '100px',
      	height: '100px',
      	border: '1px solid black'
      },
      btn: {
      	border: '1px solid black',
      	width: '120px',
      	padding: '3px',
      	textAlign: 'center'
      }
    }
	}

	getPrediction = (e) => {
		let canvas = document.getElementsByTagName('canvas')
		let image = canvas[0].toDataURL('image/png')
		console.log(image)
		canvas[0].width = canvas[0].width
		Axios.post('/api/predict', { image })
		.then(response => console.log(response.data.image))
		.catch(err => console.log(err))
	}

	render = () => {
		return (
			<div>
				<div>Sketch a Number!</div>
				<div className="drawing" style={this.state.styles}> 
					<DrawableCanvas
						className="sketch"
						brushColor="black"
						lineWidth={8}
					/>
				</div>
				<div onClick={this.getPrediction} style={this.state.btn}>Get Prediction</div>
			</div>
		)
	}
}

ReactDOM.render(<Handwriting />, document.getElementById('app'))