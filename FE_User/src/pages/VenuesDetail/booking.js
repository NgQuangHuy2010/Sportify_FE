import React from "react";
import dayjs from "dayjs";
import { Modal, TimePicker, Form, DatePicker, Select, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
const BookingModal = ({ visible, onClose }) => {
    const { control, handleSubmit, reset , setError} = useForm();

    const onSubmit = (data) => {
        // Kiểm tra nếu endTime trước startTime thì báo lỗi
        if (dayjs(data.endTime).isBefore(dayjs(data.startTime))) {
          setError("endTime", {
            type: "manual",
            message: "End time must be after start time",
          });
          return;
        }
    
        const formattedData = {
          sportsField: data.sportsField,
          date: data.date ? dayjs(data.date).format("YYYY-MM-DD") : null,
          startTime: data.startTime ? dayjs(data.startTime).format("HH:mm") : null,
          endTime: data.endTime ? dayjs(data.endTime).format("HH:mm") : null,
        };
    
        console.log("Formatted Data:", formattedData);
      };
    
  const options = [
    {
      value: "1",
      label: "Sân 1",
    },
    {
      value: "2",
      label: "Sân 2",
    },
    {
      value: "3",
      label: "Sân 3",
    },
  ];
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
      title={<h3 style={{ textAlign: "center", fontWeight:"bold"}}>Depot18 - Sports</h3>}   
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{padding:"20px"}}>
        {/* Sports Field */}
        <Form.Item label="Sports Field">
          <Controller
            name="sportsField"
            control={control}
            rules={{ required: "Please select a field!" }}
            render={({ field }) => (
              <Select {...field} placeholder="----Choose----" style={{ width: "100%" }} options={options} />
            )}
          />
        </Form.Item>

        {/* Date */}
        <Form.Item label="Date">
          <Controller
            name="date"
            control={control}
            rules={{ required: "Please select a date!" }}
            render={({ field }) => (
              <DatePicker {...field} style={{ width: "100%" }} disabledDate={DisabledDate} />
            )}
          />
        </Form.Item>

        {/* Start Time */}
        <Form.Item label="Start Time">
          <Controller
            name="startTime"
            control={control}
            rules={{ required: "Please select start time!" }}
            render={({ field }) => (
              <TimePicker {...field} format="HH:mm" style={{ width: "100%" }} 
              disabledTime={() => ({
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
            render={({ field }) => (
              <TimePicker {...field} format="HH:mm" style={{ width: "100%" }}
              disabledTime={() => ({
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
