import axios from 'axios'
import { path } from '../constants/pathConstant'
import React, { Component } from 'react'
import MessageList  from './MessageList'

class MessageBoard extends Component {
  constructor() {
    super()
    this.state = {
       messages: [],
       newMessage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`${path}/message_boards/${this.props.messageBoardId}`)
    .then(resp => {
      console.log("get message_boards:")
      console.log(resp)
      this.setState({
        messages: resp.data.messages
      })
    })
  }

  componentDidUpdate() {
    axios.get(`${path}/message_boards/${this.props.messageBoardId}`)
    .then(resp => {
      console.log("get message_boards:")
      console.log(resp)
      this.setState({
        messages: resp.data.messages
      })
    })
  }

  handleChange(e) {
    this.setState({
      newMessage: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post(`${path}/messages`, {
      author_id: this.props.userId,
      message_board_id: this.props.messageBoardId,
      type: "text",
      text: this.state.newMessage
    })
    .then(resp => {
      console.log("create resp:")
      console.log(resp)
      this.setState({
        newMessage: ''
      })
      console.log("newMessagE:")
      console.log(this.state.newMessage)
    })
  }

  render() {
    return (
      <>
        <div className="message-board">
          <h1>Messages</h1>
          <MessageList
            messages={this.state.messages}
            userId={this.props.userId}
          />
          <form
            onSubmit={this.handleSubmit}
            className="send-message-form">
            <input
              onChange={this.handleChange}
              value={this.state.newMessage}
              placeholder="Type your message and hit ENTER"
              type="text" />
          </form>
       </div>
      </>
    )
  }
}

export default MessageBoard
