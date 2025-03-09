import React, { useState, useEffect, useRef } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  Avatar,
  ChatContainer,
  ConversationHeader,
  Message,
  MessageInput,
  MessageSeparator,
  TypingIndicator,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import { useTranslation } from "react-i18next";

import SideBarChat from "./SideBarChat";
import chatService from "../../services/chatService";
import ramImage from "./images/ram.png";
import { infoUser } from "~/services/infoUser";

export default function Main() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [otherUserName, setOtherUserName] = useState(null);
  const [otherUserAvatar, setOtherUserAvatar] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInputValue, setMessageInputValue] = useState("");
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token-login");

  useEffect(() => {
    // Lấy thông tin user khi component mount
    if (token) {
      infoUser(token)
        .then((user) => setCurrentUser(user))
        .catch((error) => console.error("Lỗi khi lấy thông tin user:", error));
    }
  }, [token]);

  // 🏷️ Khi chọn phòng chat
  const handleSelectRoom = async (roomId, name, avatar) => {
    if (selectedRoomId) {
      chatService.unsubscribeFromRoomMessages(selectedRoomId);
      console.log("UNSUB ROOM ", selectedRoomId);
    }

    setSelectedRoomId(roomId);
    setOtherUserName(name);
    setOtherUserAvatar(avatar);
    setMessages([]); // Xóa tin nhắn cũ

    try {
      // 🕵 Lấy tin nhắn lịch sử
      const chatHistory = await chatService.getChatHistory(roomId);
      console.log("Chat History: ", chatHistory);
      const formattedMessages = chatHistory.map((msg) => ({
        id: msg.id,
        sender: msg.senderName,
        message: msg.content,
        sentTime: new Date(msg.sentAt).toLocaleTimeString(),
        direction:
          msg.senderId == currentUser?.userId ? "outgoing" : "incoming",
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử chat:", error);
    }

    // 🎧 Đăng ký lắng nghe tin nhắn mới
    chatService.subscribeToRoomMessages(roomId, (newMessage) => {
      console.log("NEW MES: ", newMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: newMessage.id,
          sender: newMessage.senderName,
          message: newMessage.content,
          sentTime: new Date().toLocaleTimeString(),
          direction:
            newMessage.senderId == currentUser.userId ? "outgoing" : "incoming",
        },
      ]);
    });
  };

  // 📩 Xử lý gửi tin nhắn
  const handleSend = (message) => {
    if (!selectedRoomId || !message.trim()) return;

    // Gửi tin nhắn qua WebSocket
    chatService.sendMessage(selectedRoomId, currentUser.userId, message);

    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageInputValue("");
    inputRef.current?.focus();
  };

  return (
    <div style={{ height: "600px", position: "relative" }}>
      <MainContainer responsive className="border-0">
        <SideBarChat onSelectRoom={handleSelectRoom} />

        {!selectedRoomId ? (
          <ChatContainer className="d-flex align-items-center justify-content-center"></ChatContainer>
        ) : (
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar
                src={`${process.env.REACT_APP_PATH_IMAGE}avatar/${otherUserAvatar}`}
                name={otherUserName}
              />
              <ConversationHeader.Content userName={otherUserName} />
              <ConversationHeader.Actions>
                <button className="btn fs-3 border-0">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </ConversationHeader.Actions>
            </ConversationHeader>

            <MessageList>
              <MessageSeparator content="Today" />

              {messages.map((msg, index) => (
                <Message
                  key={index}
                  model={{
                    message: msg.message,
                    sentTime: msg.sentTime,
                    sender: msg.sender,
                    direction: msg.direction,
                  }}
                >
                  {msg.avatar && <Avatar src={msg.avatar} name={msg.sender} />}
                </Message>
              ))}
            </MessageList>

            <MessageInput
              onSend={handleSend}
              placeholder={t("chat.placeholder-input-chat")}
              value={messageInputValue}
              onChange={(innerHtml, textContent) =>
                setMessageInputValue(textContent)
              }
            />
          </ChatContainer>
        )}
      </MainContainer>
    </div>
  );
}