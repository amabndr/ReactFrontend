import React, { Component } from "react";
import { connect } from "react-redux";
import { setUserName } from "./store/actions/userActions";
import { receiveMessage } from "./store/actions/messageActions";
import { HubConnectionBuilder } from "@aspnet/signalr";

import AddChatRoomForm from "./components/AddChatRoomForm";
import AddMessageForm from "./components/AddMessageForm";
import ChatRoomList from "./components/ChatRoomList";
import MessageList from "./components/MessageList";
import UserNameForm from "./components/UserNameForm";
import NoRoomSelected from "./components/NoRoomSelected";
import Title from "./components/Title";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44314/chatHub")
      .build();
  }
  componentDidMount() {
    this.connection
      .start({ withCredentials: false })
      .catch(err => console.error(err.toString()));
  }

  render() {
    const { userName, onSetUserName, currentRoom } = this.props;

    return (
      <div className="App">
        <Title />
        {userName ? (
          <AddMessageForm roomId={currentRoom.id} userName={userName} connection={this.connection} />
        ) : (currentRoom ? (
          <UserNameForm onSetUserName={onSetUserName} />
        ) : <div> Pick a room.</div>)}
        <AddChatRoomForm connection={this.connection} />

        <ChatRoomList openRoom={() => 1} connection={this.connection} />
        {currentRoom ? (
          <MessageList roomId={currentRoom.id} connection={this.connection}  userName={userName}/>
        ) : (
          <NoRoomSelected />
        )}
             </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.userInfo.userName,
    currentRoom: state.requestRooms.currentRoom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetUserName: name => dispatch(setUserName(name)),

    onReceiveMessage: (
      user,
      message,
      roomId,
      messageId,
      postedAt,
      currentRoomId
    ) =>
      dispatch(
        receiveMessage(
          user,
          message,
          roomId,
          messageId,
          postedAt,
          currentRoomId
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
