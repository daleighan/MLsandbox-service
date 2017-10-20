import React, { Component } from 'react';
import Messages from './messages.jsx';

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages:[
        {
          from: "Chat R. Bot",
          text: "Hi!  I'm Chat R. Bot.  What's your name?"
        }
      ]
    }
  }

  handleSubmit (event) {
    const text = event.target.value;
    if (event.key == 'Enter' && text) {
      const message = {
        text,
        from: 'user',
      }
      this.setState({messages: [...this.state.messages, message]})
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
        <div className="geosuggest__input-wrapper">
          <input className='geosuggest__input' id='bio-input' type="text" placeholder='Enter a message...' onKeyUp={this.handleSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Chatbot;