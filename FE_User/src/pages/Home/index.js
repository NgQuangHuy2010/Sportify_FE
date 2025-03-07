import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, message } from "antd";
import styles from "./home.module.scss";
import FilterUser from "./filterUser";
import classNames from "classnames/bind";
import BookVenuesCarousel from "./bookVenuesCarousel";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "~/services/getAllUser";
import { infoUser } from "~/services/infoUser";
import { deleteInvitation, sendInvitation } from "~/services/addsFriends";

const cx = classNames.bind(styles);
const { Meta } = Card;

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const token = localStorage.getItem("token-login");

  const showConfirmModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //get all user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token-login"); // Lấy token từ localStorage
        if (!token) return; // Nếu không có token, không gọi API

        const [allUsers, currentUser] = await Promise.all([
          getAllUser(token),
          infoUser(token),
        ]);
        if (allUsers && currentUser) {
          // Lọc ra danh sách user không phải là user hiện tại
          const filteredUsers = allUsers.filter(
            (user) => user.userId !== currentUser.userId
          );

          // console.log("user", filteredUsers);

          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const savedRequests =
      JSON.parse(localStorage.getItem("sentRequests")) || [];
    setSentRequests(savedRequests);
  }, []);

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        const storedRequests =
          JSON.parse(localStorage.getItem("sentRequests")) || [];
        setSentRequests(storedRequests);
      } catch (error) {
        console.error("Error loading sent requests:", error);
      }
    };

    fetchSentRequests();
  }, []);

  const handleSendRequest = async (receiverId) => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    try {
      const response = await sendInvitation(receiverId, token);
      const updatedRequests = [...sentRequests, receiverId];
      setSentRequests(updatedRequests);
      localStorage.setItem("sentRequests", JSON.stringify(updatedRequests));
      message.success("Gửi lời mời thành công");
      console.log("Response:", response);
    } catch (error) {
      alert("Gửi lời mời thất bại!");
      console.error("Error:", error);
    }
  };

  //hủy lời mời
  const handleCancelRequest = async () => {
    try {
      await deleteInvitation(selectedUserId, token);
      const updatedRequests = sentRequests.filter((id) => id !== selectedUserId);
      setSentRequests(updatedRequests);
      localStorage.setItem("sentRequests", JSON.stringify(updatedRequests)); // Lưu vào localStorage
      message.success("Hủy lời mời thành công");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to cancel invitation:", error);
    }
  };

  return (
    <div>
      <div className="p-5">
        <div className="">
          <BookVenuesCarousel />
        </div>
        <div className="p-5">
          <FilterUser />
        </div>
        <Row gutter={[16, 16]}>
          {users.map((item) => (
            <Col key={item.userId} xs={24} sm={12} md={8} lg={6}>
              <Card
                className={cx("card-profile")}
                hoverable
                style={{ width: "unset" }}
              >
                <div className="d-flex align-items-center">
                  {/* Ảnh đại diện hình tròn */}
                  <img
                    src={`${process.env.REACT_APP_PATH_IMAGE}avatar/${item?.avatar}`}
                    alt={item.title}
                    className={cx("img-profile")}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%", // Giữ hình tròn
                      objectFit: "cover",
                      marginRight: "16px",
                      cursor: "pointer",
                    }}
                  />

                  {/* Thông tin cá nhân */}
                  <div>
                    <span
                      className={cx("title-profile")}
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      {item.lastname} {item.firstname}
                    </span>
                    <p
                      style={{
                        margin: "4px 0",
                        color: "#666",
                        minHeight: "20px", // Đặt chiều cao tối thiểu để giữ layout cố định
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.bio || " "}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {item.sports.length > 0 ? (
                        item.sports.map((sport, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <img
                              src={`${process.env.REACT_APP_PATH_IMAGE}sports/${sport.imageUrl}`}
                              alt={sport.sportName}
                              style={{
                                width: "20px",
                                height: "20px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                            <span>{sport.sportName}</span>
                          </div>
                        ))
                      ) : (
                        <span>Không có môn thể thao</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hành động */}
                <div className="d-flex justify-content-around mt-5 ">
                  <button
                    className={cx("button-connect", {
                      sent: sentRequests.includes(item.userId), // Nếu đã gửi lời mời, thêm class 'sent'
                    })}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (sentRequests.includes(item.userId)) {
                        showConfirmModal(item.userId); // Nếu đã gửi → Hủy lời mời
                      } else {
                        handleSendRequest(item.userId); // Nếu chưa gửi → Gửi lời mời
                      }
                    }}
                  >
                    <i
                      className={`fa-solid ${
                        sentRequests.includes(item.userId)
                          ? "fa-user-check"
                          : "fa-user-plus"
                      }`}
                    ></i>
                    <span className="ms-2">
                      {sentRequests.includes(item.userId)
                        ? "Hủy lời mời"
                        : "Gửi lời mời"}
                    </span>
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal
          title="Xác nhận hủy lời mời"
          open={isModalOpen}
          onOk={handleCancelRequest} // Nếu nhấn OK, gọi API hủy
          onCancel={() => setIsModalOpen(false)} // Nếu nhấn Cancel, đóng modal
          okText="Có"
          cancelText="Không"
        >
          <p>Bạn có chắc muốn hủy lời mời kết bạn không?</p>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
