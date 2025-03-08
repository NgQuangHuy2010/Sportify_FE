// import axios from "axios";
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// const baseURL = process.env.REACT_APP_BASE_URL.replace(/\/api\/?$/, "");
// const API_URL = `${baseURL}/api/chat`; // Cập nhật API URL
// const WEBSOCKET_URL = `${baseURL}/ws`;

// let stompClient = null;
// let messageCallback = null;

// // 🟢 Kết nối WebSocket
// const connectWebSocket = (userId, callback) => {
//   console.log("Connect to: ", API_URL);
//   if (stompClient && stompClient.connected) return;

//   const socket = new SockJS(WEBSOCKET_URL);
//   stompClient = new Client({
//     webSocketFactory: () => socket,
//     reconnectDelay: 5000,
//     onConnect: () => {
//       console.log("🔗 WebSocket Connected");
//       messageCallback = callback;

//       // Lắng nghe danh sách phòng chat của user
//       stompClient.subscribe(`/topic/chatrooms/${userId}`, (message) => {
//         const updatedChatRooms = JSON.parse(message.body);
//         if (messageCallback) messageCallback(updatedChatRooms);
//       });
//     },
//     onDisconnect: () => console.log("❌ WebSocket Disconnected"),
//     onStompError: (error) => console.error("WebSocket Error:", error),
//   });

//   stompClient.activate();
// };

// // 🛑 Ngắt kết nối WebSocket
// const disconnectWebSocket = () => {
//   if (stompClient) {
//     stompClient.deactivate();
//     console.log("🔌 WebSocket Disconnected");
//   }
// };

// // 📨 Lấy danh sách phòng chat
// const getChatRooms = async () => {
//   const token = localStorage.getItem("token-login");
//   const response = await axios.get(`${API_URL}/rooms`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   console.log(response.data);
//   return response.data;
// };

// const chatService = {
//   getChatRooms,
//   connectWebSocket,
//   disconnectWebSocket,
// };

// export default chatService;

import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { infoUser } from "./infoUser";

const baseURL = process.env.REACT_APP_BASE_URL.replace(/\/api\/?$/, "");
const API_URL = `${baseURL}/api/chat`; // API URL
const WEBSOCKET_URL = `${baseURL}/ws`; // WebSocket URL

let stompClient = null;
let chatRoomsCallback = null;
let messageCallbacks = {};

// 🟢 Kết nối WebSocket & Subscribe danh sách phòng chat
const connectWebSocket = (token, userId, callback) => {
  if (!token) {
    console.error("🚨 Không có token, không thể kết nối WebSocket!");
    return;
  }
  if (!userId) {
    console.error("🚨 Không có userId, không thể kết nối WebSocket!");
    return;
  }
  if (stompClient && stompClient.connected) return;

  const socket = new SockJS(WEBSOCKET_URL);
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log(" WebSocket Connected");
      chatRoomsCallback = callback;

      // 📌 Subscribe danh sách phòng chat
      stompClient.subscribe(`/topic/chatrooms/${userId}`, (message) => {
        const updatedChatRooms = JSON.parse(message.body);
        console.log(" Nhận danh sách phòng chat từ server:", updatedChatRooms);
        if (chatRoomsCallback) chatRoomsCallback(updatedChatRooms);
      });
    },
    onDisconnect: () => console.log("❌ WebSocket Disconnected"),
    onStompError: (error) => console.error("WebSocket Error:", error),
  });

  stompClient.activate();
};

// 🛑 Ngắt kết nối WebSocket
const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log("🔌 WebSocket Disconnected");
  }
};

// 🔔 Subscribe tin nhắn của phòng chat
const subscribeToRoomMessages = (roomId, callback) => {
  if (!stompClient || !stompClient.connected) return;

  console.log(`📩 Subscribing to messages of room ${roomId}`);
  if (messageCallbacks[roomId]) return; // Nếu đã sub thì không sub lại

  const subscription = stompClient.subscribe(
    `/topic/messages/${roomId}`,
    (message) => {
      const newMessage = JSON.parse(message.body);
      callback(newMessage);
    }
  );

  messageCallbacks[roomId] = subscription;
};

// ❌ Unsubscribe tin nhắn của phòng chat
const unsubscribeFromRoomMessages = (roomId) => {
  if (messageCallbacks[roomId]) {
    messageCallbacks[roomId].unsubscribe();
    delete messageCallbacks[roomId];
    console.log(`🚫 Unsubscribed from messages of room ${roomId}`);
  }
};

// 📨 Lấy danh sách phòng chat
const getChatRooms = async () => {
  const token = localStorage.getItem("token-login");
  const response = await axios.get(`${API_URL}/rooms`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getChatHistory = async (chatRoomId) => {
  const token = localStorage.getItem("token-login");
  const response = await axios.get(
    `${baseURL}/api/messages/history/${chatRoomId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

const sendMessage = (chatRoomId, senderId, message) => {
  if (!stompClient || !stompClient.connected) {
    console.error("❌ WebSocket chưa kết nối!");
    return;
  }

  const messageData = {
    senderId: senderId,
    content: message,
  };

  stompClient.publish({
    destination: `/app/chat/${chatRoomId}`,
    body: JSON.stringify(messageData),
  });

  console.log("📨 Đã gửi tin nhắn:", messageData);
};

const chatService = {
  getChatRooms,
  getChatHistory,
  connectWebSocket,
  disconnectWebSocket,
  subscribeToRoomMessages,
  unsubscribeFromRoomMessages,
  sendMessage,
};

export default chatService;
