import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Descriptions, Card } from "antd";
import BookingModal from "./booking";

function VenuesDetails() {
  const location = useLocation();
  const venue = location.state?.venue;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const description = JSON.parse(venue.description);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1 className="fw-bold my-5">{venue.name}</h1>
            <img
              style={{ width: "700px", height: "400px" }}
              alt="hâha"
              src={`${process.env.REACT_APP_PATH_IMAGE}sport-center/${venue?.image}`}
            />
            <Card bordered className="w-full shadow-md " style={{border:"none"}}>
              <Descriptions
                title="Mô tả về sân"
                column={1}
                bordered
                size="middle"
              >
                <Descriptions.Item label="Kích thước">
                  {description.size}
                </Descriptions.Item>
                <Descriptions.Item label="Loại sân">
                  {description.grass}
                </Descriptions.Item>
                <Descriptions.Item label="Loại đèn">
                  {description.lights}
                </Descriptions.Item>
                <Descriptions.Item label="Thoát nước">
                  {description.drainage}
                </Descriptions.Item>
                <Descriptions.Item label="Khán đài">
                  {description.stands}
                </Descriptions.Item>
                <Descriptions.Item label="Chất lượng lưới">
                  {description.nets}
                </Descriptions.Item>
                <Descriptions.Item label="Số sân con">
                  {description.sub_fields}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </div>
          <div
            className="col-6 d-flex flex-column align-items-center"
            style={{ paddingTop: "50px" }}
          >
            <BookingModal
              visible={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              venue={venue}
            />
            <Button
              type="primary"
              className="w-75 py-4 fs-4 fw-bold"
              style={{ height: "max-content" }}
              onClick={() => setIsModalOpen(true)}
            >
              Đặt ngay
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                width: "75%",
              }}
              className="mt-3"
            >
              <h2
                style={{
                  fontWeight: "600",
                  fontSize: "1.6rem",
                  marginBottom: "8px",
                }}
              >
                Thời gian mở cửa
              </h2>
              <div
                style={{
                  marginTop: "8px",
                  lineHeight: "1",
                  fontSize: "1.4rem",
                }}
              >
                {venue.open_door}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                width: "75%",
              }}
              className="mt-3"
            >
              <h2
                style={{
                  fontWeight: "600",
                  fontSize: "1.6rem",
                  marginBottom: "8px",
                }}
              >
                Địa điểm
              </h2>
              <p
                style={{
                  marginTop: "8px",
                  lineHeight: "1",
                  fontSize: "1.4rem",
                }}
              >
                {venue.location}
              </p>
              <iframe
                title="kk"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15674.419665266407!2d106.69953764594933!3d10.84151652897795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175286514783427%3A0x40ce9385750b3c3f!2zS2h1IMSRw7QgVGjhu4sgVuG6oW4gUGjDumMsIEhp4buHcCBCw6xuaCBQaMaw4bubYywgVGjhu6cgxJDhu6ljLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1739197194178!5m2!1svi!2s"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VenuesDetails;
