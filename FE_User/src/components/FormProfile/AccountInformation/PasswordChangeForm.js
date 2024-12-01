import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";

function PasswordChangeForm({ isOpen, onClose, onSave }) {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const handleSave = () => {
    // form
    //   .validateFields()
  };

  return (
    <Modal
      title={t("modal-change-password.title")}
      open={isOpen}
      onCancel={onClose}
      onOk={handleSave}
      footer={[
        <Button key="submit" type="primary" onClick={handleSave}>
          {t("modal-profile.button-save")}
        </Button>,
        <Button key="cancel" onClick={onClose}>
          {t("modal-profile.button-cancel")}
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label={t("modal-change-password.old-password")}
          name="oldPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t("modal-change-password.new-password")}
          name="newPassword"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={t("modal-change-password.confirm-password")}
          name="confirmPassword"
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PasswordChangeForm;
