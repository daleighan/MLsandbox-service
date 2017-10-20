import React, { Component } from 'react';

const Message = ({message}) => {
  if (message.message) {
    if (true) {
      return (
        <li className="sender"><div className="sender-bubble">{message.message}</div></li> 
      );
    } else {
      return (
        <li className="recipient"><div className="recipient-bubble">{message.message}</div></li> 
      );
    }
  } else {
    return null;
  }
};

export default Message;