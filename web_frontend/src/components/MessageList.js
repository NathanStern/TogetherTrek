import '../index.css'
import React, { Component } from 'react'

class MessageList extends Component {
  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map(message => {
          let className
          if (this.props.userId == message.author_id) {
            className = "current-user-message"
          } else {
            className = "other-user-message"
          }
          return (
           <li key={message._id} className={className}>
             <h6>
               {message.author_id}
             </h6>
             <p>
               {message.data}
             </p>
           </li>
         )
       })}
     </ul>
    )
  }
}

export default MessageList
