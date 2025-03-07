import React, { useEffect, useState } from "react";
// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ConversationList,
  Avatar,
  Conversation,
  Search,
} from "@chatscope/chat-ui-kit-react";
import { useTranslation } from "react-i18next";
import { getAllFriends } from "~/services/addsFriends";
import { set } from "react-hook-form";

export default function SideBarChat() {
  const { t } = useTranslation();
  const [userInfo, setUser] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token-login");

    if (token) {
     
      getAllFriends(token).then((data) => {
        if (data) setUser(data);
      });
    }
  }, [localStorage.getItem("token-login")]);


return (
  <div className="p-3" style={{ height: "460px" }}>
    <Search placeholder={t("chat.placeholder-input-search")} />
    <ConversationList>
      {userInfo?.map((user) => (
        <Conversation
          key={user.userId}
          name={`${user.lastname} ${user.firstname}`}
          lastSenderName={user.email} // Có thể thay bằng thông tin khác
          info={user.bio || "Không có thông tin"} // Hiển thị bio nếu có
        >
          <Avatar
            src={`${process.env.REACT_APP_PATH_IMAGE}avatar/${user.avatar}`}
            name={user.firstname}
          />
        </Conversation>
      ))}
    </ConversationList>
  </div>
);


}
