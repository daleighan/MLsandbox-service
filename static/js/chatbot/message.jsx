import React, { Component } from 'react';

const Message = ({message}) => {
  if (message.text) {
    if (true) {
      return (
        <li className="sender"><div className="sender-bubble">{message.text}</div></li> 
      );
    } else {
      return (
        <li className="recipient"><div className="recipient-bubble">{message.text}</div></li> 
      );
    }
  } else {
    return null;
  }
};

export default Message;