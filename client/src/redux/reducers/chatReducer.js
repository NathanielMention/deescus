import {
  GET_CHAT,
  POST_MESSAGE,
  CREATE_ROOM_SUCCESS,
  JOIN_ROOM_SUCCESS,
  REMOVE_ROOM_SUCCESS,
  LEAVE_ROOM,
  GET_ROOMS_SUCCESS,
} from "../actions/actionType";

export default function (
  state = {
    room: {},
    rooms: [],
    chats: [],
  },
  action
) {
  switch (action.type) {
    case GET_CHAT:
      return { ...state, chats: [action.payload] };
    case POST_MESSAGE: {
      const messages = [...state.room.messages];
      messages.push(action.payload);
      return { ...state, room: { ...state.room, messages } };
    }
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        room: action.payload,
        rooms: [
          ...state.rooms,
          { roomid: action.payload.roomid, name: action.payload.name },
        ],
      };
    case JOIN_ROOM_SUCCESS:
      return { ...state, room: action.payload };
    case REMOVE_ROOM_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.filter(
          (room) => room.roomid !== action.payload.roomId
        ),
      };
    case LEAVE_ROOM:
      return {
        ...state,
        room: {},
      };
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: [...action.payload.rooms],
      };
    default:
      return state;
  }
}
