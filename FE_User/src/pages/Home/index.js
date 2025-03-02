import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal } from "antd";
import styles from "./home.module.scss";
import FilterUser from "./filterUser";
import classNames from "classnames/bind";
import BookVenuesCarousel from "./bookVenuesCarousel";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "~/services/getAllUser";
import { infoUser } from "~/services/infoUser";

const cx = classNames.bind(styles);
const { Meta } = Card;

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const showModal = (profile) => {
    setSelectedProfile(profile);
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
          getAllUser(),
          infoUser(token),
        ]);
        if (allUsers && currentUser) {
          // Lọc ra danh sách user không phải là user hiện tại
          const filteredUsers = allUsers.filter(
            (user) => user.userId !== currentUser.userId
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="p-5">
        <div className="">
          <BookVenuesCarousel />
        </div>
        <div className="p-5">
          <FilterUser />
        </div>
        <Row gutter={[16, 16]} justify="center">
          {users.map((item) => (
            <Col key={item.userId} xs={24} sm={12} md={8} lg={6}>
              <Card className={cx("card-profile")} hoverable style={{width:"unset"}}>
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
                    onClick={() => showModal(item)}
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
                      onClick={() => showModal(item)}
                    >
                      {item.lastname} {item.firstname}
                    </span>
                    <p style={{ margin: "4px 0", color: "#666" }}>{item.bio}</p>
                  </div>
                </div>

                {/* Hành động */}
                <div className="d-flex justify-content-around mt-5 ">
                  <button
                    className={cx("button-connect")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fa-solid fa-user-plus"></i>
                    <span className="ms-2">Gửi lời mời</span>
                  </button>
                  <button
                    className={cx("button-connect")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fa-solid fa-envelope"></i>
                    <span className="ms-2">Lời nhắn</span>
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal
          title="Thông tin người dùng"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          {selectedProfile && (
            <div>
              <img
                src={selectedProfile.image}
                alt={selectedProfile.name}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <h3>{selectedProfile.title}</h3>
              <p>
                <strong>Description:</strong> {selectedProfile.description}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Home;
