import React, { useState, useEffect } from "react";
import Logo from "../../icons/send.svg";
import TextInput from "../common/TextInput";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import "../../styles/Messages.scss";
import socket from "../../config/socketConfig";
import { Comment, Tooltip, Avatar } from "antd";

function Messages(props) {
  const [message, setMessage] = useState("");
  const currentRoom = useSelector((state) => state.chat.room);
  const user = useSelector((state) => state.user.user);
  const messageList =
    currentRoom.messages &&
    currentRoom.messages.map((message, index) => (
      <Comment
        key={index}
        author={<div>{message.username}</div>}
        avatar={<Avatar src={message.avatar} alt={message.username} />}
        content={<div>{message.message}</div>}
        datetime={
          <Tooltip>
            <Moment
              date={message.createdat}
              format="YYYY-MM-DD HH:mm"
              interval={60000}
            ></Moment>
          </Tooltip>
        }
      />
    ));

  const handleUserKeyPress = (e) => {
    const { keyCode } = e;
    if (keyCode === 13) {
      handleNewMessage();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const handleNewMessage = () => {
    socket.emit("new message", {
      message,
      avatar: user.avatar,
      userId: user.id,
      username: user.username,
      roomId: currentRoom && currentRoom.roomid,
    });
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chatWindow">
      <ol className="chat">
        {props.inRoom && (
          <>
            <div>{messageList}</div>
            <div className="chatInputWrapper">
              <TextInput
                placeholder="Chat"
                value={message}
                onChange={handleChange}
              ></TextInput>

              <Logo
                className="submitBtn"
                onClick={() => handleNewMessage()}
              ></Logo>
            </div>
          </>
        )}
      </ol>
    </div>
  );
}

export default Messages;
