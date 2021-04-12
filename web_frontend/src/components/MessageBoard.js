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

  getMessageBoardData() {
    axios.get(`${path}/message_boards/${this.props.messageBoardId}`)
    .then(async resp => {
      let messages = resp.data.messages
      let author_id_username_map = {}
      let i
      for (i = 0; i < messages.length; i++) {
        let author_id = messages[i].author_id
        if (author_id in author_id_username_map) {
          messages[i].username = author_id_username_map[author_id]
        } else {
          let user = await axios.get(`${path}/users/${author_id}`)
          let username = user.data.username
          author_id_username_map[author_id] = username
          messages[i].username = username
        }
      }

      this.setState({
        messages: messages
      })
    })
  }

  componentDidMount() {
    this.getMessageBoardData()
  }

  componentDidUpdate() {
    this.getMessageBoardData()
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
      this.setState({
        newMessage: ''
      })
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
