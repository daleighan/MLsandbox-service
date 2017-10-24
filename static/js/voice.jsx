import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import Axios from 'axios';

class VoiceRecognitionWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      prediction: "none"
    }
  }
  
  startRecording = () => {
    this.setState({ record: true });
  }

  stopRecording = () => {
    this.setState({ record: false });
  }

  onStop = (blob) => {
    let formData = new FormData()
    formData.append("file", blob.blob);
    Axios.post('/api/speech', formData, {
      headers: { 'content-type': 'multipart/form-data' }
    }).then(response => this.setState({prediction: response.data.prediction}))
    .catch(err => console.log(err));
  }

  render = () => {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <div>Prediction: {this.state.prediction}</div>
      </div>
    )
  }
}

export default VoiceRecognitionWrapper;
