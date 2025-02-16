import React, { useRef, useState } from "react";
import {
  Carousel,
  Row as BsRow,
  Col as BsCol,
  Card as BsCard,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "antd";
import config from "~/config";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "Venue 1",
    text: "A beautiful event space for weddings and parties.",
    image:
      "https://playo.gumlet.io/BTSTURFCLUB20240531052641675463/BTSTurfClub1717174005529.jpg?mode=crop&crop=smart&h=200&width=450&q=40&format=webp",
  },
  {
    title: "Venue 2",
    text: "Modern and stylish location for corporate events.",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    title: "Venue 3",
    text: "A scenic outdoor venue with breathtaking views.",
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    title: "Venue 4",
    text: "Luxury ballroom with premium amenities.",
    image:
      "https://playo.gumlet.io/DEPOT18SPORTS20250202081042972914/Depot18Sports1738672619162.jpg?mode=crop&crop=smart&h=200&width=450&q=40&format=webp",
  },
  {
    title: "Venue 5",
    text: "A perfect spot for private parties and gatherings.",
    image: "https://source.unsplash.com/300x200/?party,venue",
  },
  {
    title: "Venue 6",
    text: "An elegant banquet hall for any celebration.",
    image: "https://source.unsplash.com/300x200/?banquet,hall",
  },
  {
    title: "Venue 7",
    text: "A perfect spot for private parties and gatherings.",
    image: "https://source.unsplash.com/300x200/?party,venue",
  },
  {
    title: "Venue 8",
    text: "An elegant banquet hall for any celebration.",
    image: "https://source.unsplash.com/300x200/?banquet,hall",
  },
];

// Hàm chia array thành nhóm nhỏ (mỗi nhóm 3 card trên 1 slide)
const chunkArray = (arr, size) => {
  return arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    []
  );
};

function BookVenuesCarousel() {
  const chunkedItems = chunkArray(items, 4); // Hiển thị 3 card trên mỗi slide
  const carouselRef = useRef(null); // Dùng useRef để điều khiển Carousel
  const [activeIndex, setActiveIndex] = useState(0); // Theo dõi chỉ mục hiện tại
  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (activeIndex < chunkedItems.length - 1) {
      carouselRef.current.next();
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-between px-5">
        <div>
          <h2 className="fw-bold">Đặt chỗ địa điểm</h2>
        </div>
        <div>
          <button className="btn" onClick={() => navigate(config.routes.allVenues)}>
            <h3 className="fw-bold" style={{ color: "rgb(25, 138, 204)" }}>
            XEM TẤT CẢ CÁC ĐỊA ĐIỂM <i className="fa-solid fa-chevron-right"></i>
            </h3>
          </button>
        </div>
      </div>
      <Carousel
        className="p-4"
        ref={carouselRef}
        indicators={false}
        controls={false}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      >
        {chunkedItems.map((group, index) => (
          <Carousel.Item key={index}>
            <BsRow className="d-flex justify-content-center">
              {group.map((item, idx) => (
                <BsCol md={3} key={idx}>
                  <BsCard
                    className="m-2"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        height: "150px",
                        overflow: "hidden",
                        borderRadius: "12px 12px 0 0",
                      }}
                    >
                      <BsCard.Img
                        variant="top"
                        style={{
                          height: "200px",
                          padding: "10px",
                          borderRadius: "15px",
                          objectFit: "cover",
                        }}
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <BsCard.Body>
                      <BsCard.Title>{item.title}</BsCard.Title>
                      <BsCard.Text>{item.text}</BsCard.Text>
                    </BsCard.Body>
                  </BsCard>
                </BsCol>
              ))}
            </BsRow>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="mt-3 d-flex justify-content-center gap-3">
        <Button
          variant="dark"
          onClick={handlePrev}
          disabled={activeIndex === 0}
        >
          <i className="fa-solid fa-angle-left"></i>
        </Button>
        <Button
          variant="dark"
          onClick={handleNext}
          disabled={activeIndex === chunkedItems.length - 1}
        >
          <i className="fa-solid fa-angle-right"></i>
        </Button>
      </div>
    </div>
  );
}

export default BookVenuesCarousel;
