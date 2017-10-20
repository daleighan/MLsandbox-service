import React, { Component } from 'react';
import Messages from './messages.jsx';
import axios from 'axios';

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages:[
        {
          from: "Chat R. Bot",
          message: "Hi!  I'm Chat R. Bot.  What's your name?"
        }
      ]
    }
  }

  getResponse(message) {
    axios.post('/api/tairygreene', {message}).then((result) => {
      let response = {
        message: result.data.response,
        from: "Chat R. Bot",
      }
      this.setState({messages: [...this.state.messages, response]})      
    }).catch((err) => {
      console.log(err);
    })
  }

  handleSubmit (event) {
    const message = event.target.value;
    if (event.key == 'Enter' && message) {
      const query = {
        message,
        from: 'user',
      }
      this.setState({messages: [...this.state.messages, query]}, () => {
        this.getResponse(query.message)
      })
      event.target.value = '';
    }
  }
  
  render() {
    return (
      <div>
        <ul className="chat-thread">
        <Messages 
          messages={this.state.messages}
        />
        </ul>
        <div className="user_input-wrapper">
          <input className='user_input' type="text" placeholder='Enter a message...' onKeyUp={this.handleSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Chatbot;