import { getData } from "../../api/api";
import {
  REQUEST_MESSAGES_PENDING,
  REQUEST_MESSAGES_SUCCESS,
  REQUEST_MESSAGES_FAILED,
  DELETE_MESSAGES_PENDING,
  DELETE_MESSAGES_SUCCESS,
  DELETE_MESSAGES_FAILED,
  RECEIVE_MESSAGE
} from "./actionTypes";

const baseUrl = "https://localhost:44314/api/message";

export const requestMessages = (roomId = "") => dispatch => {
  const url = roomId ? `${baseUrl}/${roomId}` : baseUrl;
  dispatch({ type: REQUEST_MESSAGES_PENDING });
  getData(url)
    .then(data => dispatch({ type: REQUEST_MESSAGES_SUCCESS, payload: data }))
    .catch(error =>
      dispatch({ type: REQUEST_MESSAGES_FAILED, payload: error })
    );
};

export const deleteMessage = (msgId = "",roomId="") => dispatch => {
  debugger
  const url = msgId ? `${baseUrl}/delete/${roomId}/${msgId}` : baseUrl;
  dispatch({ type: DELETE_MESSAGES_PENDING });
  getData(url)
  .then(data => dispatch({ type: DELETE_MESSAGES_SUCCESS, payload: data }))
    .catch(error =>
      dispatch({ type: DELETE_MESSAGES_FAILED, payload: error })
    );
};



export function receiveMessage(
  userName = "",
  message = "",
  roomId = null,
  id = null,
  postedAt = null,
  currentRoomId = null
) {
  const filteredMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return {
    type: RECEIVE_MESSAGE,
    payload: {
      message: {
        userName,
        id,
        roomId,
        postedAt,
        contents: filteredMessage
      },
      currentRoomId
    }
  };
}
