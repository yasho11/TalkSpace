import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:1256";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});



export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
    console.log("Socket connected");
  }
};




export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("Socket disconnected");
  }
};
