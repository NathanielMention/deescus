import socket from "./config/socketConfig";
import { leaveRoom } from "./redux/actions/chatActions";

export function handleLeaveRoom(dispatch, roomId) {
  socket.emit("leave room", {
    room: roomId,
  });
  dispatch(leaveRoom());
}
