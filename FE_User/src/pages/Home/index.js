import React, { useState } from "react";
import { Card, Row, Col, Modal } from "antd";
import styles from "./home.module.scss";
import FilterUser from "./filterUser";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const { Meta } = Card;

const data = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Card title ${index + 1}`,
  description: `This is the description for card ${index + 1}`,
  image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
}));

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const showModal = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="p-5">
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
  );
}

export default Home;
