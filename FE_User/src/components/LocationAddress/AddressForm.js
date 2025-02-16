import React, { useEffect, useState,forwardRef  } from "react";
import { Select, Form } from "antd";
import locations from "./locations.json"; // Import dữ liệu từ file JSON
import { useTranslation } from "react-i18next";
const { Option } = Select;

const AddressForm = forwardRef(({ value, onChange }, ref) => {
  const { t } = useTranslation();
  const [wards, setWards] = useState([]); // Phường/Xã
  const [selectedCity, setSelectedCity] = useState(null); // Tỉnh/Thành phố đã chọn
  const [selectedDistrict, setSelectedDistrict] = useState(null); // Quận/Huyện đã chọn
  // Hàm xử lý thay đổi thành phố
  const handleCityChange = (cityCode) => {
    const city = locations.find((item) => item.code === cityCode);
    setSelectedCity(city);
    setSelectedDistrict(null);
    setWards([]);
    triggerChange({ city: cityCode, district: null, ward: null });
  };
  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  };
  

  // Hàm xử lý thay đổi quận
  const handleDistrictChange = (districtCode) => {
    const district = selectedCity?.districts.find(
      (item) => item.code === districtCode
    );
    setSelectedDistrict(district);
    setWards(district?.wards || []); // Cập nhật danh sách phường
    triggerChange({ district: districtCode, ward: null });
  };

  // Sử dụng useEffect để reset quận và phường khi thay đổi thành phố
  useEffect(() => {
    // Khi thành phố thay đổi, reset quận và phường
    setSelectedDistrict(null); // Reset quận
    setWards([]); // Reset phường
  }, [selectedCity, setSelectedDistrict, setWards]); // Cập nhật lại khi thành phố thay đổi

  return (
    <div className="row">
    {/* <div className="col-12">
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={t("modal-profile.label-form-infor-personal-address")}
        name="address"
      >
        <Input
         value={value?.address || ""}
         onChange={(e) =>
          onChange({ ...value, address: e.target.value })
        }
          placeholder={t("modal-profile.placeholder-form-infor-personal-address")}
        />
      </Form.Item>
    </div> */}

    {/* Thành phố/Tỉnh */}
    <div className="col-4">
      <Form.Item
       labelCol={{ span: 24 }}
       wrapperCol={{ span: 24 }}
        label={t("modal-profile.label-form-infor-personal-city")}
        name="city"
      >
        <Select
          placeholder={t("modal-profile.placeholder-form-infor-personal-city")}
          onChange={handleCityChange}
          value={selectedCity?.code || undefined} // Cập nhật giá trị của thành phố đã chọn
          style={{ width: "100%" }}
        >
          {locations.map((city) => (
            <Option key={city.code} value={city.code}>
              {city.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>

    {/* Quận/Huyện */}
    <div className="col-4">
      <Form.Item
       labelCol={{ span: 24 }}
       wrapperCol={{ span: 24 }}
        label={t("modal-profile.label-form-infor-personal-district")}
        name="district"
      >
        <Select
          placeholder={t("modal-profile.placeholder-form-infor-personal-district")}
          onChange={handleDistrictChange}
          value={selectedDistrict?.code || undefined} // Đảm bảo giá trị là undefined nếu chưa chọn quận
          style={{ width: "100%" }}
          disabled={!selectedCity} // Disabled nếu chưa chọn thành phố
        >
          {selectedCity?.districts.map((district) => (
            <Option key={district.code} value={district.code}>
              {district.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>

    {/* Phường/Xã */}
    <div className="col-4">
      <Form.Item
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        label={t("modal-profile.label-form-infor-personal-ward")}
        name="ward"
      >
        <Select
          placeholder={t("modal-profile.placeholder-form-infor-personal-ward")}
          style={{ width: "100%" }}
          value={value?.ward || undefined} // Đảm bảo giá trị là undefined khi chưa chọn phường
          disabled={!selectedDistrict} // Disabled nếu chưa chọn quận
          onChange={(wardCode) => triggerChange({ ward: wardCode })}
        >
          {wards.map((ward) => (
            <Option key={ward.code} value={ward.code}>
              {ward.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  </div>
  );
});

export default AddressForm;
