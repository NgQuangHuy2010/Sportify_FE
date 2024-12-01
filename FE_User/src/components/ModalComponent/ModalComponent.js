import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalComponent.module.scss"; // Đảm bảo bạn import đúng CSS module của mình

import { Modal, Button } from "antd"; // Cái này từ Ant Design
import { useTranslation } from "react-i18next";
const cx = classNames.bind(styles);

function ModalComponent({
  isOpen,
  onClose,
  title,
  children,
  buttonSave,
  buttonCancel,
  footer,
  className
}) {
  const { t } = useTranslation();

  const handleOk = () => {
    onClose(); // Đóng modal khi nhấn OK
  };

  const handleCancel = () => {
    onClose(); // Đóng modal khi nhấn Cancel
  };

  return (
    <Modal
    className={cx(className,"ant-modal")}
    maskClosable={false}
      title={title || "Default Title"}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footer ||[
        <Button key="submit" type="primary" onClick={buttonSave}>
          {t("modal-profile.button-save")}
        </Button>,
        <Button key="back" onClick={buttonCancel}>
          {t("modal-profile.button-cancel")}
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
}

export default ModalComponent;
