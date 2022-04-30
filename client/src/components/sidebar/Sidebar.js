import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createRoom,
  removeRoom,
  joinRoom,
  getRooms,
} from "../../redux/actions/chatActions";
import "../../styles/Sidebar.scss";
import { handleLeaveRoom } from "../../utils";

const Sidebar = () => {
  const [roomName, setRoomName] = useState("");
  const roomLists = useSelector((state) => state.chat.rooms);
  const currentRoom = useSelector((state) => state.chat.room);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  function handleCreateRoom() {
    dispatch(createRoom(roomName));
    setRoomName("");
  }

  function handleJoinRoom(roomid) {
    // leave a room if user is in one already
    if (currentRoom && currentRoom.roomid)
      handleLeaveRoom(dispatch, currentRoom.roomid);
    dispatch(joinRoom(roomid));
  }

  return (
    <div className="sidenav">
      <div className="create">
        <div>
          <span className="createLogo">Create new room</span>
          <input
            type="text"
            className="createForm"
            placeholder="Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button className="createBtn" onClick={handleCreateRoom}>
            Create
          </button>

          <ul>
            {roomLists.map((room) => (
              <li
                className="joinroom-btn"
                onClick={() => handleJoinRoom(room.roomid)}
                key={room.roomid}
              >
                {room.name}
                <span
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeRoom(room.roomid));
                  }}
                >
                  x
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
