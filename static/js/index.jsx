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
      	backgroundColor: 'black',
      	width: '400px',
      	height: '400px',
      	border: '1px solid black'
      },
      btn: {
      	border: '1px solid black',
      	width: '120px',
      	padding: '3px',
      	textAlign: 'center',
      	borderRadius: '5px',
      	marginBottom: '3px'
      },
      currentPrediction: 'none'
    }
	}

	getPrediction = (e) => {
		let canvas = document.getElementsByTagName('canvas')
		let image = canvas[0].toDataURL('image/png')
		let toSend = image.slice(22)
		canvas[0].width = canvas[0].width
		Axios.post('/api/predict', { image: toSend })
		.then(response => this.setState({ currentPrediction: response.data.prediction }))
		.catch(err => console.log(err))
	}

	clearCanvas = (e) => {
		let canvas = document.getElementsByTagName('canvas')
		canvas[0].width = canvas[0].width
	}

	render = () => {
		return (
			<div>
				<div>Sketch a Number!</div>
				<div className='drawing' style={this.state.styles}> 
					<DrawableCanvas
						className='sketch'
						brushColor='#D0D0D0'
						lineWidth={0.5}
				/>
				</div>
				<div onClick={this.getPrediction} style={this.state.btn}>Get Prediction</div>
				<div onClick={this.clearCanvas} style={this.state.btn}>Clear the Canvas</div>
				<div>Current Prediction: {this.state.currentPrediction} </div>
			</div>
		)
	}
}

ReactDOM.render(<Handwriting />, document.getElementById('app'))