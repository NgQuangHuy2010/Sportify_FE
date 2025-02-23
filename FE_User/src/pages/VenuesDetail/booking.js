import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Modal, TimePicker, Form, DatePicker, Select, Button, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { getVenues_Sports_Fields, getBookedSlots, postBookedSlots } from "~/services/venues";
const BookingModal = ({ visible, onClose, venue }) => {
    const { control, handleSubmit, reset , setError, watch,setValue } = useForm();
    const [sportsFields, setSportsFields] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
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
            const data = await getBookedSlots(selectedField, selectedDate.format("YYYY-MM-DD"));
            setBookedSlots(data); 
          } catch (error) {
            console.error("Lỗi khi tải booked slots:", error);
          }
        };
        fetchBookedSlots();
      }
    }, [selectedField, selectedDate]);

    const getDisabledStartHours = () => {
      const bookedRanges = bookedSlots.map(slot => ({
        start: new Date(`1970-01-01T${slot.startTime}`).getHours(),
        end: new Date(`1970-01-01T${slot.endTime}`).getHours(),
      }));
    
      const disabledHours = new Set([0, 1, 2, 3, 4, 23]); // Chặn giờ ngoài 05:00 - 23:00
    
      bookedRanges.forEach(({ start, end }) => {
        for (let i = start; i < end; i++) {
          disabledHours.add(i); // Chặn tất cả giờ đã có người đặt
        }
      });
    
      return [...disabledHours];
    };
    
    
    const getDisabledEndHours = (startTime) => {
      if (!startTime) return [];
      const startHour = startTime.hour();
      const bookedRanges = bookedSlots.map(slot => ({
          start: new Date(`1970-01-01T${slot.startTime}`).getHours(),
          end: new Date(`1970-01-01T${slot.endTime}`).getHours(),
      }));
  
      const disabledHours = new Set([0, 1, 2, 3, 4, 23]);
  
      // Chặn tất cả giờ <= startHour
      for (let i = 0; i <= startHour; i++) {
          disabledHours.add(i);
      }
      // Xác định giờ kết thúc hợp lệ gần nhất
      let maxAvailableEnd = 23; // Mặc định có thể đặt đến cuối ngày
      for (let { start, end } of bookedRanges) {
          if (startHour < start) {
              maxAvailableEnd = Math.min(maxAvailableEnd, start); // Giờ trống tiếp theo
          } else if (startHour >= start && startHour < end) {
              maxAvailableEnd = end; // Nếu startHour đã bị đặt, chỉ có thể đặt đến end
          }
      }
      // Chỉ chặn giờ **sau** maxAvailableEnd, nhưng vẫn giữ maxAvailableEnd là hợp lệ
      for (let i = maxAvailableEnd + 1; i <= 23; i++) {
          disabledHours.add(i);
      }
      return [...disabledHours];
      
    };

    useEffect(() => {
      // Khi startTime thay đổi, reset lại endTime về null hoặc giá trị hợp lệ đầu tiên
      setValue("endTime", null); 
    }, [selectedStartTime, setValue]);
    const optionsVenuesField = sportsFields.map((field) => ({
      label: field.name,
      value: field.id,
    }));
    const onSubmit = async (data) => {
      if (dayjs(data.endTime).isBefore(dayjs(data.startTime))) {
        setError("endTime", {
          type: "manual",
          message: "End time must be after start time",
        });
        return;
      }
    
      // Chuẩn bị dữ liệu gửi API
      const payload = {
        userId: 63, 
        sportFieldId: data.sportsField, 
        bookingDate: data.date.format("YYYY-MM-DD"),
        startTime: data.startTime.format("HH:mm"),
        endTime: data.endTime.format("HH:mm"),
        status: "PENDING", 
        notes: "string", 
      };
    
      try {
        const response = await postBookedSlots(payload);
        // console.log("Booking Success:", response);
         message.success("Đặt sân thành công!");
        reset(); // Reset form sau khi gửi thành công
        onClose(); // Đóng modal
      } catch (error) {
        console.error("Booking Failed:", error);
        message.error("Lỗi đặt sân, Vui lòng thử lại!");
      }
    };
    
  const DisabledDate = (current) => {
    const today = dayjs().startOf("day"); 
    const sevenDaysLater = today.add(7, "day"); 
    return current && (current.isBefore(today) || current.isAfter(sevenDaysLater));
  };
  const handleClose = () => {
    reset(); 
    onClose(); 
  };
  
  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      title={<h3 style={{ textAlign: "center", fontWeight:"bold"}}>{venue.name}</h3>}   
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{padding:"20px"}}>
        {/* Sports Field */}
        <Form.Item label="Sports Field">
          <Controller
            name="sportsField"
            control={control}
            rules={{ required: "Please select a field!" }}
            render={({ field }) => (
              <Select {...field} placeholder="----Choose----" style={{ width: "100%" }} options={optionsVenuesField}  onChange={(value) => setValue("sportsField", value)}/>
            )}
          />
        </Form.Item>

        {/* Date */}
        <Form.Item label="Date">
          <Controller
            name="date"
            disabled={!watch("sportsField")} 
            control={control}
            rules={{ required: "Please select a date!" }}
            render={({ field }) => (
              <DatePicker {...field} style={{ width: "100%" }} disabledDate={DisabledDate}  onChange={(date) => setValue("date", date)}/>
            )}
          />
        </Form.Item>
        {/* Start Time */}
        <Form.Item label="Start Time">
          <Controller
            name="startTime"
            disabled={!watch("sportsField") || !watch("date")}
            control={control}
            rules={{ required: "Please select start time!" }}
            render={({ field }) => (
              <TimePicker {...field} format="HH:mm" style={{ width: "100%" }} 
              disabledTime={() => ({
                disabledHours: getDisabledStartHours,
                disabledMinutes: () => Array.from({ length: 60 }, (_, i) => (i !== 0 ? i : null)),
              })}
              />
            )}
          />
        </Form.Item>

        {/* End Time */}
        <Form.Item label="End Time">
          <Controller
            name="endTime"
            control={control}
            rules={{ required: "Please select end time!" }}
            disabled={!watch("startTime")} 
            render={({ field }) => (
              <TimePicker {...field} format="HH:mm" style={{ width: "100%" }}
              disabledTime={() => ({
                disabledHours: () => getDisabledEndHours(selectedStartTime),
                disabledMinutes: () => Array.from({ length: 60 }, (_, i) => (i !== 0 ? i : null)),
            })}            
              />
            )}
          />
        </Form.Item>

        <Button type="primary" block htmlType="submit">
          Make a booking
        </Button>
      </Form>
    </Modal>
  );
};

export default BookingModal;
