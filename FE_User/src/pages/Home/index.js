import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal } from "antd";
import styles from "./home.module.scss";
import FilterUser from "./filterUser";
import classNames from "classnames/bind";
import BookVenuesCarousel from "./bookVenuesCarousel";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const { Meta } = Card;
const names = [
  "Nguyễn Văn An", "Trần Thị Bích", "Lê Minh Hoàng", "Phạm Văn Dũng",
  "Hoàng Thị Lan", "Bùi Ngọc Huy", "Đặng Quang Minh", "Võ Thị Mai",
  "Lý Văn Thanh", "Tô Thị Hạnh", "Cao Xuân Trường", "Đỗ Thị Thu"
];
const images = [
  "https://media.loveitopcdn.com/54/091609-thumb-15222092411420-ds-770.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlGh8iKfrKwPt8H_jN5NDGwWWrByNffSBjazJIeHc6kQSHaxgKwGzRQ_8mcdVK_7bSUmQ&usqp=CAU",
  "https://www.inhuydat.com/uploads/hinhthe/Chup-anh-the-dep-nhat-TPHCM-7.jpg",
  "https://www.inhuydat.com/uploads/hinhthe/IMG_2793_copy.jpg",
  "https://studiochupanhdep.com/Upload/Images/Album/anh-the-2023.jpg",
  "https://i.pinimg.com/474x/bb/1f/9c/bb1f9c30bc815087d52d1e5e86cde219.jpg",
  "https://smilemedia.vn/wp-content/uploads/2022/09/chup-hinh-the-dep-e1664379729855.jpg",
  "https://anhvienpiano.com/wp-content/uploads/2021/12/anh-visa-dep.png"
];
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const data = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: getRandomItem(names),
  // description: `Đây là mô tả cho ${getRandomName()}`,
  image: getRandomItem(images),
}));


function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const showModal = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const isRegistered = localStorage.getItem("isRegistered");
    if (!isRegistered) {
      navigate("/register", { replace: true });  // Điều hướng về trang đăng ký nếu chưa đăng ký
    }
  }, [navigate]);
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
          {data.map((item) => (
            <Col
              key={item.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="d-flex justify-content-center"
            >
              <Card
                className={cx("card-profile")}
                hoverable
                cover={
                  <img
                  style={{height:"250px", objectFit:"cover"}}
                    alt={item.title}
                    src={item.image}
                    onClick={() => showModal(item)} // Chỉ gọi showModal khi nhấp vào ảnh
                    className={cx("img-profile")}
                  />
                }
                actions={[
                  <div className="d-flex align-items-center justify-content-around">
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
                  </div>,
                ]}
              >
                <Meta
                  title={
                    <span
                      className={cx("title-profile")}
                      onClick={() => showModal(item)}
                    >
                      {item.title}
                    </span>
                  } // Chỉ gọi showModal khi nhấp vào tiêu đề
                  description={item.description}
                />
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
