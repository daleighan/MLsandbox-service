import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import Axios from 'axios';
import Recorder from 'recorder-js';

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

  recordAndSubmit = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();  
    const recorder = new Recorder(audioContext, {
      onAnalysed: data => {},
    });
    let isRecordeing = false;
    let blob = null;
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => recorder.init(stream))
      .catch(err => console.log(err));
    
    setTimeout(() => {
      recorder.start()
    }, 100);

    setTimeout(() => {
      recorder.stop()
        .then(({blob, buffer}) => {
          blob = blob;
          let formData = new FormData();
          formData.append('file', blob);
          Axios.post('/api/speech', formData, {
            headers: { 'content-type': 'multipart/form-data' }
          }).then(response => {
            this.setState({prediction: response.data.prediction})
            console.log(response);
            audioContext.close();
          })
            .catch(err => console.log(err));
        }).catch(err => console.log(err));
    }, 2500);
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
        <div>Second Version:
          <button onClick={this.recordAndSubmit}>Get new recording</button>
        </div>
      </div>
    )
  }
}

export default VoiceRecognitionWrapper;
