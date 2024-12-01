import React, { useRef, useState } from "react";
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
import ramImage from "./images/ram.png";
const messagess = [
  {
    message: "Ê",
    sentTime: "15 mins ago",
    sender: "Huy",
    direction: "incoming",
    position: "single",
    avatar: ramImage,
  },
  {
    message: "hú",
    sentTime: "15 mins ago",
    sender: "Huy",
    direction: "incoming",
    position: "single",
    avatar: ramImage,
  },
  {
    message: "Hello my frienddd",
    sentTime: "15 mins ago",
    sender: "Huy",
    direction: "outgoing",
    position: "single",
  },
  {
    message: "Hú",
    sentTime: "15 mins ago",
    sender: "Huy",
    direction: "outgoing",
    position: "single",
  },
];
export default function Main() {
  // Set initial message input value to empty string
  const [messageInputValue, setMessageInputValue] = useState("");
  const inputRef = useRef(null);
  const [messages, setMessages] = useState(messagess);
  const { t } = useTranslation();
  const handleSend = (message) => {
    setMessages([...messages, { message, direction: "outgoing" }]);
    setMessageInputValue("");
    inputRef.current?.focus();
  };
  return (
    <div
      style={{
        height: "600px",
        position: "relative",
      }}
    >
      <MainContainer responsive className="border-0">
        <SideBarChat position="left" scrollable={false} />

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={require("./images/ram.png")} name="Zoe" />
            <ConversationHeader.Content
              userName="Huy"
              info="Active 30 mins ago"
            />
            <ConversationHeader.Actions>
              <button className="btn fs-3 border-0">
                {" "}
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Huy is typing" />}
          >
            <MessageSeparator content="Tuesday, 12 November 2024" />

            {messages.map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.message,
                  sentTime: msg.sentTime,
                  sender: msg.sender,
                  direction: msg.direction,
                  position: msg.position,
                }}
                avatarSpacer={msg.avatarSpacer}
              >
                {msg.avatar && <Avatar src={msg.avatar} name={msg.sender} />}
              </Message>
            ))}
          </MessageList>

          <MessageInput
            onSend={handleSend}
            style={{ backgroundColor: "white" }}
            placeholder={t("chat.placeholder-input-chat")}
            value={messageInputValue}
            onChange={(innerHtml, textContent, innerText, nodes) =>
              setMessageInputValue(textContent)
            }
            // onSend={(innerHtml, textContent, innerText, nodes) => {
            //   // console.log("Message sent:", textContent);
            //   setMessageInputValue("");
            // }}
            onAttachClick={() => {
              // Xử lý khi nhấp vào nút đính kèm
              const inputFile = document.createElement("input");
              inputFile.type = "file";
              // inputFile.onchange = (event) => {
              //   const file = event.target.files[0];
              //   // if (file) {
              //   //   console.log("File attached:", file); // Xử lý file tải lên
              //   // }
              // };
              inputFile.click();
            }}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
