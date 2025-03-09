import React, { useEffect, useState } from "react";
import {
  ConversationList,
  Avatar,
  Conversation,
  Search,
} from "@chatscope/chat-ui-kit-react";
import { useTranslation } from "react-i18next";
import chatService from "../../services/chatService";
import { infoUser } from "~/services/infoUser";

export default function SideBarChat({ onSelectRoom }) {
  const { t } = useTranslation();
  const [chatRooms, setChatRooms] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token-login");

  useEffect(() => {
    if (token) {
      console.log("TOKEN IN SIDEBARCHAT: ", token);
      infoUser(token)
        .then((user) => {
          console.log("✅ USER INFO FETCHED: ", user);
          setCurrentUser(user); // Cập nhật user
        })
        .catch((error) =>
          console.error("❌ Lỗi khi lấy thông tin user:", error)
        );
    } else {
      console.log("NO TOKEN IN SIDEBARCHAT ");
    }
  }, [token]); // Chỉ chạy lại khi token thay đổi

  useEffect(() => {
    if (!currentUser) return; // Chờ `currentUser` có giá trị

    console.log("CURRENT USER IN SIDEBARCHAT: ", currentUser);
    // const userId = currentUser.userId;
    const fetchChatRooms = async () => {
      try {
        const rooms = await chatService.getChatRooms();
        setChatRooms(rooms);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách phòng chat:", error);
      }
    };

    fetchChatRooms();
    // 📌 Nhận danh sách phòng chat mới từ server
    const handleUpdatedChatRooms = (updatedChatRooms) => {
      console.log(
        "📩 Cập nhật danh sách phòng chat từ server:",
        updatedChatRooms
      );
      setChatRooms(updatedChatRooms); // 🚀 Cập nhật toàn bộ danh sách mới
    };

    chatService.connectWebSocket(
      token,
      currentUser.userId,
      handleUpdatedChatRooms
    );

    return () => {
      chatService.disconnectWebSocket();
      console.log("DISCONNECT CHATROOMLIST");
    };
  }, [currentUser]);

  return (
    <div className="p-3" style={{ height: "460px" }}>
      <Search placeholder={t("chat.placeholder-input-search")} />
      <ConversationList>
        {chatRooms.map((room) => (
          <Conversation
            key={room.roomId}
            name={room.otherUserName}
            lastSenderName={room.lastMessage ? room.otherUserName : ""}
            info={room.lastMessage || "Chưa có tin nhắn"}
            onClick={() =>
              onSelectRoom(
                room.roomId,
                room.otherUserName,
                room.otherUserAvatar
              )
            }
          >
            <Avatar
              size="50px"
              src={`${process.env.REACT_APP_PATH_IMAGE}avatar/${room.otherUserAvatar}`}
              name={room.name}
            />
          </Conversation>
        ))}
      </ConversationList>
    </div>
  );
}