import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DrawableCanvas from 'react-drawable-canvas';
import Axios from 'axios';
import bg from '../dist/bg.png';
import Housing from './housing.jsx';
import Chatbot from './chatbot/chatbot.jsx';

class Handwriting extends Component {
	constructor(props) {
		super(props)
		this.state = {
      styles: {
      	backgroundImage: `url(${bg})`,
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
		let canvas = document.getElementsByTagName('canvas');
		let image = canvas[0].toDataURL('image/png');
		let toSend = image.slice(22);
		canvas[0].width = canvas[0].width;
		Axios.post('/api/numberpredict', { image: toSend })
		.then(response => this.setState({ currentPrediction: response.data.prediction }))
		.catch(err => console.log(err));
	}

	clearCanvas = (e) => {
		let canvas = document.getElementsByTagName('canvas');
		canvas[0].width = canvas[0].width;
	}

	render = () => {
		return (
			<div>
				<div>Sketch a Number!</div>
				<div className='drawing' style={this.state.styles}> 
					<DrawableCanvas
						className='sketch'
						brushColor='white'
						lineWidth={6}
				/>
				</div>
				<div onClick={this.getPrediction} style={this.state.btn}>Get Prediction</div>
				<div onClick={this.clearCanvas} style={this.state.btn}>Clear the Canvas</div>
				<div>Current Prediction: {this.state.currentPrediction}</div>
        <Housing />
				<Chatbot />
			</div>
		)
	}
}

ReactDOM.render(<Handwriting />, document.getElementById('app'))
