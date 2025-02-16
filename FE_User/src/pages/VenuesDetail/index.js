import { useState } from "react";
import { Button } from "antd";
import BookingModal from "./booking";

function VenuesDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1 className="fw-bold my-5">Depot18 - Sports</h1>
            <img
              alt="hâha"
              src="https://playo.gumlet.io/DEPOT18SPORTS20250202081042972914/Depot18Sports1738672756586.jpg?w=700&format=webp&q=30&overlay=https://playo-website.gumlet.io/playo-website-v2/logos-icons/playo-logo.png&overlay_width_pct=0.2&overlay_height_pct=1&overlay_position=bottomright"
            />
          </div>
          <div
            className="col-6 d-flex flex-column align-items-center"
            style={{ paddingTop: "50px" }}
          >
            <BookingModal
              visible={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <Button
              type="primary"
              className="w-75 py-4 fs-4 fw-bold"
              style={{ height: "max-content" }}
              onClick={() => setIsModalOpen(true)}
            >
              Book Now
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
                  fontSize: "1.5rem",
                  marginBottom: "8px",
                }}
              >
                Timing
              </h2>
              <div
                style={{
                  marginTop: "8px",
                  lineHeight: "1",
                  fontSize: "1.3rem",
                }}
              >
                5:00 AM - 12:00 AM
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
                  fontSize: "1.5rem",
                  marginBottom: "8px",
                }}
              >
                Location
              </h2>
              <p
                style={{
                  marginTop: "8px",
                  lineHeight: "1",
                  fontSize: "1.3rem",
                }}
              >
                Chamundi Hotel Compound, Jayamahal Main Rd, opposite Jayamahal
                Palace, Jayamahal, Bengaluru, Karnataka - 560006
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
