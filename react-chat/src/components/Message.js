import React, {Component} from 'react';
import { getDateString } from '../utils';
import { connect } from 'react-redux';
class Message extends Component {
  componentDidMount() {
    this.props.connection.on(
      "RetrieveMessage",
      (roomId) => {
        this.retrieveChat(roomId);
          }
        )};
    
     retrieveChat = (roomId)=>{
        this.props.onRequesMessages(roomId);
      }

    deleteMessage = (ps) => {

    this.props.onDeleteMessage(ps.id,ps.roomId);

  }
  render() {
    let isLoggedInUseSameAsMessageOwner=(this.props.loggedUser===this.props.userName)?true:false;
    return(
    <div className="message">
      <div className="message-username">{this.props.userName} ~ <b>{getDateString(this.props.postedAt)}</b></div>
      <div className="message-text">{this.props.contents}</div>
     {isLoggedInUseSameAsMessageOwner ? ( <a onClick={() => this.deleteMessage(this.props)} href="#">
          delete
        </a>):""};
     </div>)
  };
  }


export default connect()(Message);