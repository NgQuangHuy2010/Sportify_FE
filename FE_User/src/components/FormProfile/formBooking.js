import React, { useEffect, useState } from "react";
import { infoBooking } from "~/services/getBooking"; // Import API function
import { Spin, Alert, Button, message, Modal } from "antd";
import { infoUser } from "~/services/infoUser";
import { cancelBookingAPI } from "~/services/venues";

function FormBooking({ control, userInfo, setValue,onClose }) {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
  
const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [selectedFieldSport, setSelectedFieldSport] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const token = localStorage.getItem("token-login"); // Lấy token từ localStorage
const [user, setUser] = useState([]);


  //lấy thông tin user
  useEffect(() => {
    const token = localStorage.getItem("token-login");

    if (token) {
      infoUser(token).then((data) => {
        if (data) setUser(data);
      });
    }
  }, [localStorage.getItem("token-login")]);
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await infoBooking(token);
        if (data) {
          setBookingData(data);
        } else {
          setError("Không thể lấy dữ liệu booking.");
        }
      } catch (err) {
        setError("Lỗi khi gọi API booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [token]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Lỗi" description={error} type="error" showIcon />;
console.log(bookingData);





  const showCancelModal = (bookingId, userId) => {
    console.log(bookingId);
    console.log(userId);
    
    setSelectedBookingId({bookingId,userId});
    setCancelModalVisible(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;
console.log("booking",selectedBookingId);

    try {
      await cancelBookingAPI(selectedBookingId.bookingId, selectedBookingId.userId); // 🟢 Gọi API hủy
      setBookingData((prevData) => prevData.filter(booking => booking.id !== selectedBookingId.bookingId));
      setCancelModalVisible(false);
      message.success("Hủy tham gia thành công!");
      handleClose();
    } catch (error) {
      console.error("Lỗi khi hủy:", error);
     
    }
  };
  const handleClose = () => {

    setSelectedFieldSport("");
    setTimeSlots([]);
    setSelectedTimeSlot(null);
    onClose();
  };
  return (
    <div className="p-5">
    {bookingData.length > 0 ? (
      bookingData.map((booking) => (
        <div key={booking.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Ngày đặt:</strong> {booking.bookingDate}</p>
          <p><strong>Thời gian tham gia:</strong> {booking.startTime} - {booking.endTime}</p>
          <p><strong>Ghi chú:</strong> {booking.notes || "Không có"}</p>
          <p><strong>Trạng thái:</strong> {booking.status === "PENDING" ? "Đã tham gia" : booking.status}</p>
          <p><strong>Sân thể thao:</strong> {booking.sportCenterName} - {booking.sportsFieldName}</p>
          <p><strong>Địa chỉ:</strong> {booking.sportCenterAddress}</p>
          <Button style={{backgroundColor:"red", color:"white"}}  onClick={() => showCancelModal(booking.timeSlotId, user.userId)}>Hủy tham gia</Button>
        </div>
      ))
    ) : (
      <p>Không có sân được đặt</p>
    )}

     <Modal
    
            title="Xác nhận hủy tham gia"
            open={isCancelModalVisible}
            onOk={handleCancelBooking}
            onCancel={() => setCancelModalVisible(false)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <p>Bạn có chắc chắn muốn hủy tham gia khung giờ này không?</p>
          </Modal>
  </div>
  );
}

export default FormBooking;
