import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:5001");

export default socket;
