import React, { useEffect, useState, forwardRef } from "react";
import { Select, Form, Button, Modal, message } from "antd";
import locations from "./locations.json"; // Import dữ liệu từ file JSON
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { updateAddress } from "~/services/updateAddress";
const { Option } = Select;
const AddressForm = forwardRef(({ value, onChange, userInfo,control  }, ref) => {
  // console.log("address", userInfo);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [modalCity, setModalCity] = useState(null);
  const [modalDistrict, setModalDistrict] = useState(null);
  const [modalWards, setModalWards] = useState([]);
  
  const { t } = useTranslation();
  const [wards, setWards] = useState([]); // Phường/Xã
  const [selectedCity, setSelectedCity] = useState(null); // Tỉnh/Thành phố đã chọn
  const [selectedDistrict, setSelectedDistrict] = useState(null); // Quận/Huyện đã chọn
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isHomePage = location.pathname === "/home";
  const isRegisterPage = location.pathname === "/register-infomation";
  // Hàm xử lý thay đổi thành phố
  const handleCityChange = (cityCode) => {
    const city = locations.find((item) => item.code === cityCode);
    setSelectedCity(city);
    setSelectedDistrict(null);
    setWards([]);
    form.setFieldsValue({ city: cityCode, district: null, ward: null });
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
    form.setFieldsValue({ district: districtCode, ward: null });
    triggerChange({ district: districtCode, ward: null });
  };

  // Sử dụng useEffect để reset quận và phường khi thay đổi thành phố
  useEffect(() => {
    // Khi thành phố thay đổi, reset quận và phường
    setSelectedDistrict(null); // Reset quận
    setWards([]); // Reset phường
  }, [selectedCity, setSelectedDistrict, setWards]); // Cập nhật lại khi thành phố thay đổi

  ///tự set address khi data đổ lên
  useEffect(() => {
    if (userInfo) {
      const cityCode = parseInt(userInfo.address.city);
      const districtCode = parseInt(userInfo.address.district);
      const wardCode = parseInt(userInfo.address.ward);

      // Tìm Thành phố
      const city = locations.find((item) => item.code === cityCode);
      setSelectedCity(city || null);

      if (city) {
        // Tìm Quận/Huyện
        const district = city.districts.find(
          (item) => item.code === districtCode
        );
        setSelectedDistrict(district || null);

        if (district) {
          // Cập nhật danh sách Phường/Xã
          setWards(district.wards || []);
        }
      }

      // Đặt giá trị mặc định vào form
      form.setFieldsValue({
        city: cityCode,
        district: districtCode,
        ward: wardCode,
      });
    }
  }, [userInfo, form]);

  useEffect(() => {
    if (selectedCity) {
      const districtCode = form.getFieldValue("district");
      const district = selectedCity.districts.find(
        (item) => item.code === districtCode
      );
      setSelectedDistrict(district || null);

      if (district) {
        setWards(district.wards || []);
      }
    }
  }, [selectedCity]);


  const handleModalCityChange = (cityCode) => {
    const city = locations.find((item) => item.code === cityCode);
    setModalCity(city);
    setModalDistrict(null);
    setModalWards([]);
    modalForm.setFieldsValue({ city: cityCode, district: null, ward: null });
  };
  
  const handleModalDistrictChange = (districtCode) => {
    const district = modalCity?.districts.find((item) => item.code === districtCode);
    setModalDistrict(district);
    setModalWards(district?.wards || []);
    modalForm.setFieldsValue({ district: districtCode, ward: null });
  };
  
  const openModal = () => {
    const formValues = form.getFieldsValue();
    
    const city = locations.find((item) => item.code === formValues.city);
    const district = city?.districts.find((item) => item.code === formValues.district);
    
    setModalCity(city || null);
    setModalDistrict(district || null);
    setModalWards(district?.wards || []);
    
    // Set dữ liệu vào modalForm
    modalForm.setFieldsValue({
      city: formValues.city,
      district: formValues.district,
      ward: formValues.ward,
    });
  
    setIsModalOpen(true);
  };
  

  const handleSave = async () => {
    try {
      const values = modalForm.getFieldsValue(); // Lấy dữ liệu từ form modal
  
      const updatedData = {
        ward: values.ward,
        district: values.district,
        city: values.city,
        no: values.no,
      };
  
      const addressId = userInfo.address?.id; // Lấy ID của địa chỉ cần cập nhật
  
      if (!addressId) {
        console.error("Không tìm thấy ID địa chỉ để cập nhật!");
        return;
      }
      const response = await updateAddress(addressId, updatedData); // Gọi API cập nhật
  
      if (response) {
        message.success("Cập nhật thành công", 3);
        setIsModalOpen(false);
      } else {
        console.error("Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
    }
  };
  
  
  
  
  
  

  return (
  <>
  <div>
  <Form form={form} layout="vertical">
      <div className="row">
        {/* Thành phố/Tỉnh */}
        <div className="col-4">
          <Form.Item  label={t("modal-profile.label-form-infor-personal-city")} name="city">
            <Select
            placeholder={t("modal-profile.placeholder-form-infor-personal-city")}
              value={form.getFieldValue("city") || undefined}
              onChange={handleCityChange}
              disabled={isHomePage}
            >
              {locations.map((city) => (
                <Select.Option key={city.code} value={city.code}>
                  {city.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Quận/Huyện */}
        <div className="col-4">
          <Form.Item label={t("modal-profile.label-form-infor-personal-district")} name="district">
            <Select
            placeholder={t("modal-profile.placeholder-form-infor-personal-district")}
              onChange={handleDistrictChange}
              value={selectedDistrict?.code || undefined}
              
              disabled={!selectedCity || isHomePage}
            >
              {selectedCity?.districts.map((district) => (
                <Select.Option key={district.code} value={district.code}>
                  {district.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

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
          disabled={!selectedDistrict || isHomePage} // Disabled nếu chưa chọn quận
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
    </Form>
  </div>

  {!isRegisterPage && (
  <Button type="primary" onClick={openModal} style={{ marginTop: 16 }}>
    Chỉnh sửa địa chỉ
  </Button>
)}


      <Modal
          title="Chỉnh sửa địa chỉ"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleSave}
          okText="Lưu"
          cancelText="Hủy"
          
        >
          <Form layout="vertical" form={modalForm}>
            <div className="row">
              {/* Thành phố/Tỉnh */}
              <div className="col-4">
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={t("modal-profile.label-form-infor-personal-city")}
                  name="city"
                >
                  <Select
                    placeholder={t(
                      "modal-profile.placeholder-form-infor-personal-city"
                    )}
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
                    placeholder={t(
                      "modal-profile.placeholder-form-infor-personal-district"
                    )}
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
                    placeholder={t(
                      "modal-profile.placeholder-form-infor-personal-ward"
                    )}
                    style={{ width: "100%" }}
                    value={value?.ward || undefined} // Đảm bảo giá trị là undefined khi chưa chọn phường
                    disabled={!selectedDistrict} // Disabled nếu chưa chọn quận
                    onChange={(wardCode) => {
                      form.setFieldsValue({ ward: wardCode });
                      triggerChange({ ward: wardCode });
                    }}
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
          </Form>
        </Modal>
  </>
  );
});

export default AddressForm;
