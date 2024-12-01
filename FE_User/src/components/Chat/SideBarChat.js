import React from "react";
// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ConversationList,
  Avatar,
  Conversation,
  Search,
} from "@chatscope/chat-ui-kit-react";
import { useTranslation } from "react-i18next";

export default function SideBarChat() {
  const { t } = useTranslation();

  return (
    <div className="p-3"
      style={{
        height: "460px",
      }}
    >
      <Search placeholder={t("chat.placeholder-input-search")} />
      <ConversationList>
        <Conversation
          name="Huy"
          lastSenderName="QHuy"
          info="Gì z ní"
        >
          <Avatar src={require("./images/ram.png")} name="Huy" />
        </Conversation>

        <Conversation
          name="Huy"
          lastSenderName="QHuy"
          info="Ok con dê"
        >
          <Avatar src={require("./images/ram.png")} name="Huy" />
        </Conversation>
      </ConversationList>
    </div>
  );
}
