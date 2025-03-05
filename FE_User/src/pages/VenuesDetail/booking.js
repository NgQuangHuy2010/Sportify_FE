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
} from "~/services/venues";
import { infoUser } from "~/services/infoUser";
import { getTimeSlot } from "~/services/timeSlotSport";
const BookingModal = ({ visible, onClose, venue }) => {
  const { control, handleSubmit, reset, setError, watch, setValue } = useForm();
  const [sportsFields, setSportsFields] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [user, setUser] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedFieldSport, setSelectedFieldSport] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
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

  const onSubmit = async () => {

    if (!selectedTimeSlot) {
      console.warn("Chưa chọn khung giờ!");
      return;
    }
    const selectedSlot = timeSlots.find(slot => slot.id === selectedTimeSlot);
    
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
      message.success("Đặt sân thành công!");
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

  const handleFieldChange = (value) => {
    const field = sportsFields.find((f) => f.id === value);
    setSelectedFieldSport(field);
    setValue("sportsField", field);
    //  console.log("Selected Field:", field);
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
 console.log("select Time Slots:", selectedTimeSlot);
  return (
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

        {/* Hiển thị thông tin sân
        {selectedFieldSport && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <p>
              <b>Sân:</b> {selectedFieldSport.name}
            </p>
            <p>
              <b>Loại sân:</b> {selectedFieldSport.type}
            </p>
            <p>
              <b>Kích thước:</b> {selectedFieldSport.size}
            </p>
          </div>
        )} */}

        {/* Hiển thị Time Slots */}
        {timeSlots.length > 0 && (
          <Form.Item label="Chọn khung giờ">
            <Radio.Group
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              style={{ width: "100%" }}
            >
              {timeSlots.map((slot) => (
                <Radio.Button
                  key={slot.id}
                  value={slot.id}
                  style={{
                    display: "block",
                    height: "auto",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <p>
                      <b>Thời gian:</b> {slot.startTime} - {slot.endTime}
                    </p>
                    <p>
                      <b>Ngày:</b> {slot.date}
                    </p>
                    <p>
                      <b>Tổng số người chơi chính:</b> {slot.maxPlayers} (Số người dự bị:{" "}
                      {slot.subPlayers})
                    </p>
                    <p>
                      <b>Số người đã tham gia:</b>  <b style={{color:"red"}}>5</b>
                    </p>
                  </div>
                </Radio.Button>
              ))}
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
  );
};

export default BookingModal;
