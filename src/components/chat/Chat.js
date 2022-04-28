import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Messages from "../message/Message";
import socket from "../../config/socketConfig";
import { handleLeaveRoom } from "../../utils";

function Chat() {
  const currentRoom = useSelector((state) => state.chat.room);
  const inRoom = currentRoom && currentRoom.roomid;
  const dispatch = useDispatch();

  useEffect(() => {
    if (inRoom) {
      socket.emit("room", { room: currentRoom && currentRoom.roomid });
    }
  }, [inRoom]);

  return (
    <div className="chatWrapper">
      <button
        className="chatButton"
        onClick={() => handleLeaveRoom(dispatch, currentRoom.roomid)}
      >
        {inRoom && `Leave Room`}
        {!inRoom && `Choose A Room`}
      </button>

      <Messages inRoom={inRoom} />
    </div>
  );
}

export default Chat;
