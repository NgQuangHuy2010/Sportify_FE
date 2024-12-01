import React, { useState } from "react";
import { Input, Form } from "antd";
import classNames from "classnames/bind";
import styles from "./AccountInformation.module.scss"; // Đảm bảo bạn import đúng CSS module của mình
import PasswordChangeForm from "./PasswordChangeForm";
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);

function AccountInformation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSavePassword = () => {
   // console.log("Lưu mật khẩu mới"); 
    handleCloseModal();
  };

  return (
    <>
      <Form.Item label="Email" name="email">
        <Input disabled />
      </Form.Item>

      <Form.Item label={t("modal-profile.label-form-account-password")} name="password">
        <Input.Password disabled visibilityToggle={false} />
      </Form.Item>
      <div
        className={cx("btn", "button-change-password")}
        onClick={handleOpenModal}
      >
        <span className="me-4">{t("modal-change-password.title")}</span>
        <i className="fa-solid fa-pencil"></i>
      </div>
      <PasswordChangeForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePassword}
      />
    </>
  );
}

export default AccountInformation;
