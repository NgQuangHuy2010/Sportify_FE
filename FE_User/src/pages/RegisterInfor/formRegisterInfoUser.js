import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Select, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/en_US";

import AvatarProfile from "~/components/FormProfile/AvatarProfile/AvatarProfile";
import AddressForm from "~/components/LocationAddress/AddressForm";
const RegisterInfoUser = ({ initialData, onSubmit, prev }) => {
  const { Option } = Select;
  const { control, handleSubmit,formState: { errors }, } = useForm();
  const [profileData, setProfileData] = useState({ bio: "", preview: "" });
  const validateRule = ({ required, pattern, minLength, maxLength, message }) => {
    let rules = {};
  
    if (required) {
      rules.required = message || "Trường này không được để trống";
    }
    if (pattern) {
      rules.pattern = { value: pattern, message: message || "Giá trị không hợp lệ" };
    }
    if (minLength) {
      rules.minLength = { value: minLength, message: message || `Tối thiểu ${minLength} ký tự` };
    }
    if (maxLength) {
      rules.maxLength = { value: maxLength, message: message || `Tối đa ${maxLength} ký tự` };
    }
  
    return rules;
  };
  const customLocale = {
    ...locale,
    lang: {
      ...locale.lang,
      today: null, // Xóa chữ "Today"
    },
  };
  const disabledDate = (current) => {
    // Không cho phép chọn ngày hôm nay hoặc ngày trong tương lai
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ phút giây về 0 để so sánh chính xác
    return current && current >= today;
  };
  const formatDate = (date) => {
    if (!date) return null; // Nếu không có giá trị, trả về null
    const year = date.$y; // Lấy năm từ đối tượng Day.js
    const month = String(date.$M + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, cần +1 và định dạng 2 chữ số
    const day = String(date.$D).padStart(2, "0"); // Định dạng ngày thành 2 chữ số
    return `${year}-${month}-${day}`;
  };
  const handleFormSubmit = (formData) => {
    const formattedData = {
      ...formData,
      dob: formData.dob ? formatDate(formData.dob) : null, // Format ngày sinh
      ...profileData, // Kết hợp dữ liệu từ AvatarProfile
    };
    onSubmit(formattedData); // Truyền dữ liệu đầy đủ lên cha
  };
  return (
    <form
    onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="row">
        <div className="col-6">
          <AvatarProfile control={control}  onChange={(data) => setProfileData(data)}/>
        </div>
        <div className="col-6 pt-5">
          <div className="row mb-3">
            <div className="col-md-6">
              <Controller
                name="lastName"
                control={control}
                rules={validateRule({ required: true, message: "Họ không được để trống" })}
                render={({ field }) => (
                  <Form.Item
                    label="Họ"
                    validateStatus={errors.lastName ? "error" : ""}
                    help={errors.lastName?.message}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input {...field} placeholder="Nhập họ của bạn" />
                  </Form.Item>
                )}
              />
            </div>
            <div className="col-md-6">
              <Controller
                name="firstName"
                control={control}
                rules={validateRule({ required: true, message: "Tên không được để trống" })}
                render={({ field }) => (
                  <Form.Item
                    label="Tên"
                    validateStatus={errors.firstName ? "error" : ""}
                    help={errors.firstName?.message}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input {...field} placeholder="Nhập tên của bạn" />
                  </Form.Item>
                )}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <Controller
                name="gender"
                control={control}
                rules={validateRule({ required: true, message: "Vui lòng chọn giới tính" })}
                render={({ field }) => (
                  <Form.Item
                    label="Giới tính"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    validateStatus={errors.gender ? "error" : ""}
                    help={errors.gender?.message}
                  >
                    <Select {...field} placeholder="Chọn giới tính">
                      <Option value="MALE">Nam</Option>
                      <Option value="FEMALE">Nữ</Option>
                      <Option value="NA">Khác</Option>
                    </Select>
                  </Form.Item>
                )}
              />
            </div>
            <div className="col-md-6">
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label="Ngày sinh"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <DatePicker
                      {...field}
                      placeholder="Chọn ngày sinh"
                      format="DD/MM/YYYY"
                      className="w-100"
                      locale={customLocale}
                      disabledDate={disabledDate}
                    />
                  </Form.Item>
                )}
              />
            </div>
          </div>
          <div className="row">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <AddressForm value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-5">
        {prev && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            <i className="fa-solid fa-arrow-left"></i> Quay lại
          </Button>
        )}
        <Button type="primary" htmlType="submit" className="mt-3">
          Tiếp tục <i className="fa-solid fa-arrow-right"></i>
        </Button>
      </div>
    </form>
  );
};

export default RegisterInfoUser;
