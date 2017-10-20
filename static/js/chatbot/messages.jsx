import React, { Component } from 'react';
import Message from './message.jsx';


const Messages = ({messages}) => {
  return (
    <div>
      {messages.map((message) => {
        return (
          <Message
            message={message}
          />
        ) 
      })}
    </div>
  )
};

export default Messages;