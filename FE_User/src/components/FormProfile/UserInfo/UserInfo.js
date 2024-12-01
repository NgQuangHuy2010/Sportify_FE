import React, { useState } from "react";
import { Input, Select, Form, DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import { Controller } from 'react-hook-form';
import classNames from "classnames/bind";
import locale from "antd/es/date-picker/locale/vi_VN";
import styles from "./UserInfo.module.scss";
import AddressForm from "~/components/LocationAddress/AddressForm";

const cx = classNames.bind(styles);
const { Option } = Select;
const customLocale = {
  ...locale,
  lang: {
    ...locale.lang,
    today: null, // Xóa chữ "Today"
  },
};
const UserInfo = ({ control }) => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const disabledDate = (current) => {
    // Không cho phép chọn ngày hôm nay hoặc ngày trong tương lai
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ phút giây về 0 để so sánh chính xác
    return current && current >= today;
  };
  return (
    <div className={cx("container")}>
      <Form layout="vertical">
        <div className="row">
        <div className="col-md-6">
            <Controller
              name="lastName"  // Tên trường phải trùng với tên trong `useForm` của component cha
              control={control}  // Truyền `control` từ component cha
              render={({ field }) => (
                <Form.Item label={t("modal-profile.label-form-infor-personal-last_name")}>
                  <Input {...field} placeholder={t("modal-profile.placeholder-form-infor-personal-last_name")} />
                </Form.Item>
              )}
            />
          </div>
          <div className="col-md-6">
            <Controller
              name="firstName"  // Tên trường phải trùng với tên trong `useForm` của component cha
              control={control}  // Truyền `control` từ component cha
              render={({ field }) => (
                <Form.Item label={t("modal-profile.label-form-infor-personal-first_name")}>
                  <Input {...field} placeholder={t("modal-profile.placeholder-form-infor-personal-first_name")} />
                </Form.Item>
              )}
            />
          </div>

        </div>

        <div className="row">
        <div className="col-6">
            <Controller
              name="gender" 
              control={control}  
              render={({ field }) => (
                <Form.Item label={t("modal-profile.label-form-infor-personal-gender")}>
                  <Select {...field} placeholder={t("modal-profile.placeholder-form-infor-personal-gender")}>
                    <Option value="male">{t("modal-profile.value-form-infor-personal-gender-male")}</Option>
                    <Option value="female">{t("modal-profile.value-form-infor-personal-gender-female")}</Option>
                    <Option value="other">{t("modal-profile.value-form-infor-personal-gender-other")}</Option>
                  </Select>
                </Form.Item>
              )}
            />
          </div>

          <div className="col-6">
            <Controller
              name="dob"  // Trường dob trong form
              control={control}  // Truyền `control` từ component cha
              render={({ field }) => (
                <Form.Item label={t("modal-profile.label-form-infor-personal-dob")}>
                  <DatePicker
                    {...field}  // Truyền các thuộc tính của `field` cho `DatePicker`
                    placeholder={t("modal-profile.placeholder-form-infor-personal-dob")}
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
        {/* address */}
         <AddressForm     
         selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        wards={wards}
        setWards={setWards}/>
          
      </Form>
    </div>
  );
};

export default UserInfo;
