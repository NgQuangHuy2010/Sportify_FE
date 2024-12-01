import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Form, Select, DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/en_US";

import AvatarProfile from "~/components/FormProfile/AvatarProfile/AvatarProfile";
import AddressForm from "~/components/LocationAddress/AddressForm";
const RegisterInfoUser = ({ initialData, onSubmit, prev }) => {
  const { Option } = Select;
  const { control, handleSubmit } = useForm();
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
  return (
    <form

      onSubmit={handleSubmit((data) => {
        onSubmit(data); // Truyền dữ liệu lên component cha
      })}
    >
      <div className="row">
        <div className="col-6">
          <AvatarProfile control={control} />
        </div>
        <div className="col-6 pt-5">
          <div className="row mb-3">
            <div className="col-md-6">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label="Họ"
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
                render={({ field }) => (
                  <Form.Item
                    label="Tên"
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
                render={({ field }) => (
                  <Form.Item
                    label="Giới tính"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <Select {...field} placeholder="Chọn giới tính">
                      <Option value="male">Nam</Option>
                      <Option value="female">Nữ</Option>
                      <Option value="other">Khác</Option>
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
