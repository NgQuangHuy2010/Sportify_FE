import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Modal,
  TimePicker,
  Form,
  DatePicker,
  Select,
  Button,
  message,
  Radio,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import {
  getVenues_Sports_Fields,
  getBookedSlots,
  postBookedSlots,
  getBookingInfo,
  cancelBookingAPI,
} from "~/services/venues";
import { infoUser } from "~/services/infoUser";
import { getTimeSlot } from "~/services/timeSlotSport";
const BookingModal = ({ visible, onClose, venue }) => {
  const { control, reset, watch, setValue } = useForm();
  const [sportsFields, setSportsFields] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [user, setUser] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedFieldSport, setSelectedFieldSport] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  // /////////////////
  const selectedField = watch("sportsField");
  const selectedDate = watch("date");
  const selectedStartTime = watch("startTime");

  useEffect(() => {
    if (visible && venue?.id) {
      const fetchSportsFields = async () => {
        const res = await getVenues_Sports_Fields(venue.id);
        if (res) {
          setSportsFields(res);
        }
      };
      fetchSportsFields();
    }
  }, [visible, venue]);

  useEffect(() => {
    if (selectedField && selectedDate) {
      const fetchBookedSlots = async () => {
        try {
          const data = await getBookedSlots(
            selectedField,
            selectedDate.format("YYYY-MM-DD")
          );
          setBookedSlots(data);
        } catch (error) {
          console.error("Lỗi khi tải booked slots:", error);
        }
      };
      fetchBookedSlots();
    }
  }, [selectedField, selectedDate]);

  useEffect(() => {
    // Khi startTime thay đổi, reset lại endTime về null hoặc giá trị hợp lệ đầu tiên
    setValue("endTime", null);
  }, [selectedStartTime, setValue]);

  useEffect(() => {
    if (!selectedTimeSlot || !timeSlots.length) {
      console.warn("Không có khung giờ hợp lệ!");
      return;
    }

    const selectedSlotss = timeSlots.find(
      (slot) => slot.id === Number(selectedTimeSlot)
    );

    if (selectedSlotss) {
      console.log("all :", selectedSlotss);
      console.log("bookingDate :", selectedSlotss.date);
      console.log("sportFieldId:", selectedSlotss.sportsFieldId);
      console.log("timeSlotId", selectedSlotss.id);
    } else {
      console.warn("⚠️ Không tìm thấy khung giờ!");
    }
  }, [selectedTimeSlot, timeSlots]);

  const onSubmit = async () => {
    if (!selectedTimeSlot) {
      console.warn("Chưa chọn khung giờ!");
      return;
    }
    const selectedSlot = timeSlots.find((slot) => slot.id === selectedTimeSlot);

    // Chuẩn bị dữ liệu gửi API
    const payload = {
      userId: user.userId,
      sportFieldId: selectedFieldSport.id,
      bookingDate: selectedSlot.date, // 🔹 Đúng format YYYY-MM-DD từ API
      startTime: selectedSlot.startTime, // 🔹 Định dạng "HH:mm"
      endTime: selectedSlot.endTime, // 🔹 Định dạng "HH:mm"
      timeSlotId: selectedSlot.id, // 🔹 Định dạng "HH:mm"
      status: "PENDING",
      notes: "string",
    };
    console.log("🚀 Dữ liệu gửi đi:", payload);
    try {
      const response = await postBookedSlots(payload);
      // console.log("Booking Success:", response);
      message.success("Tham gia thành công!");
      reset();
      setSelectedFieldSport("");
      setTimeSlots([]);
      setSelectedTimeSlot(null);
      onClose(); // Đóng modal
    } catch (error) {
      console.error("Booking Failed:", error);
      message.error("Lỗi đặt sân, Vui lòng thử lại!");
    }
  };

  const handleClose = () => {
    reset();
    setSelectedFieldSport("");
    setTimeSlots([]);
    setSelectedTimeSlot(null);
    onClose();
  };
  //lấy thông tin user
  useEffect(() => {
    const token = localStorage.getItem("token-login");

    if (token) {
      infoUser(token).then((data) => {
        if (data) setUser(data);
      });
    }
  }, [localStorage.getItem("token-login")]);

  //chọn sân
  const handleFieldChange = async (value) => {
    const field = sportsFields.find((f) => f.id === value);
    setSelectedFieldSport(field);
    setValue("sportsField", field);

    if (!field) return;

    try {
      // 🟢 Gọi API lấy danh sách khung giờ của sân
      const slots = await getTimeSlot(field.id);
      console.log("📌 Danh sách khung giờ:", slots);

      // 🟢 Gọi API lấy số lượng đã đặt cho từng khung giờ
      const updatedSlots = await Promise.all(
        slots.map(async (slot) => {
          try {
            const bookingInfo = await getBookingInfo(
              field.id,
              slot.id,
              slot.date
            );
            console.log("info booking", bookingInfo);
            return {
              ...slot,
              bookedPlayers: bookingInfo?.bookedPlayers || 0,
              availableSlots: bookingInfo?.availableSlots || slot.maxPlayers,
              bookedUsers: bookingInfo?.bookedUsers || [],
            };
          } catch (error) {
            console.warn(
              `⚠️ Không lấy được thông tin cho khung giờ ${slot.id}:`,
              error
            );
            return {
              ...slot,
              bookedPlayers: 0,
              availableSlots: slot.maxPlayers,
              bookedUsers: [],
            };
          }
        })
      );
      setTimeSlots(updatedSlots);
    } catch (error) {
      console.error("❌ Lỗi lấy thông tin đặt sân:", error);
    }
  };

  //get time slot
  useEffect(() => {
    if (selectedFieldSport) {
      getTimeSlot(selectedFieldSport.id).then((res) => {
        if (res) {
          setTimeSlots(res); // Lưu dữ liệu vào state
        }
      });
    }
  }, [selectedFieldSport]);

  const showCancelModal = (bookingId, userId) => {
    setSelectedBookingId({bookingId,userId});
    setCancelModalVisible(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;

    try {
      await cancelBookingAPI(selectedBookingId.bookingId, selectedBookingId.userId); // 🟢 Gọi API hủy
      setCancelModalVisible(false);
      message.success("Hủy tham gia thành công!");
      handleClose();
    } catch (error) {
      console.error("Lỗi khi hủy:", error);
      message.error("Hủy thất bại, vui lòng thử lại.");
    }
  };

  
  return (
    <>
      <Modal
        open={visible}
        onCancel={handleClose}
        footer={null}
        title={
          <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
            {venue.name}
          </h3>
        }
      >
        <Form layout="vertical" style={{ padding: "20px" }} onFinish={onSubmit}>
          {/* Sports Field Selection */}
          <Form.Item label="Chọn sân">
            <Controller
              name="sportsField"
              control={control}
              rules={{ required: "Please select a field!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="----Chọn----"
                  style={{ width: "100%" }}
                  options={sportsFields.map((field) => ({
                    label: field.name,
                    value: field.id,
                  }))}
                  value={watch("sportsField")}
                  onChange={(value) => {
                    handleFieldChange(value);
                    field.onChange(value);
                  }}
                />
              )}
            />
          </Form.Item>

          {/* Hiển thị Time Slots */}
          {timeSlots.length > 0 && (
            <Form.Item label="Chọn khung giờ">
              <Radio.Group
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                style={{ width: "100%" }}
              >
                {timeSlots.map((slot) => {
                  const isUserBooked =
                    user && (slot.bookedUsers ?? []).includes(user.userId); // 🛠 Fix lỗi khai báo biến
                   
                  return (
                    <Radio.Button
                      key={slot.id}
                      value={slot.id}
                      disabled={isUserBooked} // 🔴 Disable nếu user đã đặt
                      style={{
                        display: "block",
                        height: "auto",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px",
                        marginBottom: "10px",
                        backgroundColor: isUserBooked ? "#f8d7da" : "white", // 🟥 Đổi màu nếu đã đặt
                      }}
                    >
                      <div>
                        <p>
                          <b>Thời gian:</b> {slot.startTime} - {slot.endTime}
                        </p>
                        <p>
                        <b>Ngày:</b> {dayjs(slot.date).format("DD-MM-YYYY")}
                        </p>
                        <p>
                          <b>Tổng số người chơi chính:</b> {slot.maxPlayers}
                        </p>
                        <p>
                          <b>Số người đã tham gia:</b>{" "}
                          <b style={{ color: "red" }}>
                            {slot.bookedPlayers ?? 0}
                          </b>
                        </p>
                        <p>
                          <b>Số người còn thiếu:</b>{" "}
                          <b style={{ color: "red" }}>
                            {slot.availableSlots ?? 0}
                          </b>
                        </p>
                        <div className="d-flex justify-content-between">
                          {isUserBooked && (
                            <>
                              <p style={{ color: "red" }}>
                                ⚠️ Bạn đã đặt khung giờ này!
                              </p>
                              <Button
                                onClick={() => showCancelModal(slot.id, user.userId)}
                              >
                                Hủy tham gia
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          )}

          <Button
            type="primary"
            block
            htmlType="submit"
            disabled={!selectedTimeSlot}
          >
            Tham gia ngay
          </Button>
        </Form>
      </Modal>

      {/* modal confirm hủy */}
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
    </>
  );
};

export default BookingModal;
