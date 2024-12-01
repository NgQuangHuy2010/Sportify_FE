
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Space, Dropdown } from "antd"; // Nếu bạn đang sử dụng Space từ Ant Design
import classNames from "classnames/bind"; //npm i classnames
import images from "~/assets/images";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

const LanguageDropdown = () => {
  const items = [
    {
      label: "Việt Nam",
      key: "0",
      icon: (
        <img
          src={images.flagVietNam}
          alt="vietnam"
          className={cx("img-flag-language-header")}
        />
      ),
      langCode: "vi",
    },
    {
      label: "English",
      key: "1",
      icon: (
        <img
          src={images.flagEnglish}
          alt="English"
          className={cx("img-flag-language-header")}
        />
      ),
      langCode: "en",
    },
  ];
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(items[0]);

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedLanguage(selectedItem);
      i18n.changeLanguage(selectedItem.langCode);
    }
  };

  const dropdownItems = items
    .filter((item) => item.label !== selectedLanguage.label)
    .map((item) => ({
      key: item.key,
      label: (
        <span>
          {item.icon}
          {item.label}
        </span>
      ),
    }));

  const selectedItem = {
    label: (
      <span>
        <span className={cx("text-header")}>{selectedLanguage.icon}</span>
        <span className={cx("text-header")}>{selectedLanguage.label}</span>
        <i
          className="fa-solid fa-check"
          style={{ color: "green", marginLeft: 14 }}
        ></i>
      </span>
    ),
    key: selectedLanguage.key,
  };

  return (
    <Dropdown
      menu={{
        items: [selectedItem, ...dropdownItems],
        onClick: handleMenuClick,
      }}
      trigger={["click"]}
      className="ms-5"
    >
      <div
        onClick={(e) => e.preventDefault()}
        className="fs-5 bg-white d-flex align-items-center justify-content-center p-2"
      >
        <Space className="d-flex align-items-center">
          <div className={cx("language-header")}>
            {selectedLanguage.icon} {selectedLanguage.label}
          </div>
          <i className="fa-solid fa-sort-down mb-3"></i>
        </Space>
      </div>
    </Dropdown>
  );
};

export default LanguageDropdown;
