import React, { useState } from "react";
import Select from "react-select";

const sportOptions = [
  { value: "bong-da", label: "Bóng đá", color: "#00B8D9" },
  { value: "bong-ro", label: "Bóng rổ", color: "#FF8B00" },
  { value: "quan-vot", label: "Quần vợt", color: "#5243AA" },
  { value: "cau-long", label: "Cầu lông", color: "#FF5630" },
  { value: "boi-loi", label: "Bơi lội", color: "#36B37E" },
  { value: "bong-ban", label: "Bóng bàn", color: "#0052CC" },
  { value: "chay-bo", label: "Chạy bộ", color: "#FFC400" },
  { value: "dap-xe", label: "Đạp xe", color: "#253858" },
  { value: "vo-thuat", label: "Võ thuật", color: "#00875A" },
  { value: "yoga", label: "Yoga", color: "#666666" },
];
const gender = [
  { value: "bong-da", label: "Nam" },
  { value: "bong-ro", label: "Nữ" },
  { value: "quan-vot", label: "Tất cả" },
];
const FilterUser = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "14px", // Kích thước chữ cho phần đã chọn
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "14px", // Kích thước chữ trong menu dropdown
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "14px", // Kích thước chữ cho mỗi tùy chọn
    }),
  };
  return (
    <div className=" mt-3">
      <div className="row ">
        {/* Dropdown chọn thể thao */}
        <div className="col-md-3 mb-2">
          <Select
            placeholder="Chọn các môn thể thao..."
            closeMenuOnSelect={false}
            defaultValue={selectedOptions}
            isMulti
            name="sports"
            options={sportOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
            styles={customStyles}
          />
        </div>

        {/* Dropdown chọn giới tính */}
        <div className="col-md-3 mb-2">
          <Select
            placeholder="Chọn giới tính..."
            className="basic-single"
            classNamePrefix="select"
            name="color"
            options={gender}
            styles={customStyles}
          />
        </div>

        {/* Nút Search */}
        <div className="col-md-1 ">
          <button type="primary" className="btn btn-primary px-4 py-3  btn-lg">
            <i className="fa-solid fa-magnifying-glass p-1"></i>
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterUser;
