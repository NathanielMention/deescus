import {
  POST_MESSAGE,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_REQUEST,
  JOIN_ROOM_SUCCESS,
  REMOVE_ROOM_SUCCESS,
  LEAVE_ROOM,
  GET_ROOMS_SUCCESS,
} from "./actionType";

export function postMessage(data) {
  return {
    //get recent msg display in real time
    type: POST_MESSAGE,
    payload: data,
  };
}

export function createRoomRequest() {
  return {
    type: CREATE_ROOM_REQUEST,
  };
}

export function createRoomSuccess(payload) {
  return {
    type: CREATE_ROOM_SUCCESS,
    payload,
  };
}

export function removeRoomSuccess(roomId) {
  return {
    type: REMOVE_ROOM_SUCCESS,
    payload: {
      roomId,
    },
  };
}

export function createRoom(roomName) {
  return async function (dispatch) {
    dispatch(createRoomRequest());
    try {
      const response = await fetch("http://localhost:5000/createroom", {
        method: "POST",
        body: JSON.stringify({ roomName }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      dispatch(createRoomSuccess(responseData));
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeRoom(roomId) {
  return async function (dispatch) {
    try {
      await fetch("http://localhost:5000/removeroom", {
        method: "POST",
        body: JSON.stringify({ roomId }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      dispatch(removeRoomSuccess(roomId));
    } catch (error) {
      console.log(error);
    }
  };
}

export function joinRoomRequest() {
  return {
    type: JOIN_ROOM_REQUEST,
  };
}

export function joinRoomSuccess(payload) {
  return {
    type: JOIN_ROOM_SUCCESS,
    payload,
  };
}

export function joinRoom(roomId) {
  return async function (dispatch) {
    dispatch(joinRoomRequest());
    try {
      const response = await fetch(`http://localhost:5000/room/${roomId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      dispatch(joinRoomSuccess(responseData));
    } catch (error) {
      console.log(error);
    }
  };
}

export function leaveRoom() {
  return {
    type: LEAVE_ROOM,
  };
}

export function getRoomsSuccess(payload) {
  return {
    type: GET_ROOMS_SUCCESS,
    payload,
  };
}

export function getRooms() {
  return async function (dispatch) {
    try {
      const response = await fetch(`http://localhost:5000/rooms`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData = await response.json();
      dispatch(getRoomsSuccess(responseData));
    } catch (error) {
      console.log(error);
    }
  };
}
