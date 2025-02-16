import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import styles from "./allVenues.module.scss";
import classNames from "classnames/bind";
import { Input, Select, Checkbox, Button } from "antd";
import { useNavigate } from "react-router-dom";
import config from "~/config";

const cx = classNames.bind(styles);
const { Meta } = Card;
const { Search } = Input;
const data = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `Card title ${index + 1}`,
  description: `This is the description for card ${index + 1}`,
  sport: "https://img.icons8.com/emoji/48/soccer-ball-emoji.png",
  image:
    "https://playo.gumlet.io/BTSTURFCLUB20240531052641675463/BTSTurfClub1717174005529.jpg?mode=crop&crop=smart&h=200&width=450&q=40&format=webp",
}));
const sports = [
  { value: "bong-da", label: "Bóng đá" },
  { value: "bong-ro", label: "Bóng rổ" },
  { value: "quan-vot", label: "Quần vợt" },
  { value: "cau-long", label: "Cầu lông" },
  { value: "boi-loi", label: "Bơi lội" },
];
const onSearch = (value, _e, info) => console.log(info?.source, value);
function AllVenues() {
  const [selectedSports, setSelectedSports] = useState([]);
  const navigate = useNavigate();
  const handleChangeSport = (value) => {
    setSelectedSports(value);
  };
  const handleApply = () => {
    console.log("Môn thể thao đã chọn:", selectedSports);
  };
  return (
    <div className="p-5">
      <div className="d-flex justify-content-between p-4">
        <div>
          <h2 className="fw-bold">
            All Venues in Bangalore: Discover and Book Nearby Venues
          </h2>
        </div>
        <div>
          <Search
            placeholder="Search by venue name"
            className="mx-4"
            onSearch={onSearch}
            enterButton
            size="large"
            style={{
              width: 304,
            }}
          />

          <Select
            mode="multiple"
            size="large"
            style={{ width: 350 }}
            value={selectedSports}
            onChange={handleChangeSport}
            placeholder="Chọn môn thể thao"
            dropdownRender={(menu) => (
              <>
                {menu}
                <div style={{ padding: "8px", textAlign: "center" }}>
                  <Button type="primary" onClick={handleApply}>
                    Apply
                  </Button>
                </div>
              </>
            )}
          >
            {sports.map((sport) => (
              <Select.Option key={sport.value} value={sport.value}>
                <Checkbox checked={selectedSports.includes(sport.value)}>
                  {sport.label}
                </Checkbox>
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Row gutter={[16, 16]} justify="center">
          {data.map((item) => (
            <Col
              key={item.id}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              className="d-flex justify-content-center"
            >
              <Card
                onClick={() => navigate(config.routes.detailsVenues)}
                className={cx("card-profile")}
                hoverable
                cover={
                  <img
                    alt={item.title}
                    src={item.image}
                    className={cx("img-profile")}
                  />
                }
              >
                <Meta
                  title={
                    <div className="">
                      <span className={cx("title-profile")}>{item.title}</span>
                    </div>
                  }
                  description={item.description}
                  sport={
                    <img
                      src={item.sport}
                      alt="sport icon"
                      style={{ width: 24, height: 24, marginRight: 8 }}
                    />
                  }
                />
                <div className="d-flex justify-content-start mt-4">
                  <img
                    src={item.sport}
                    alt="sport icon"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default AllVenues;
