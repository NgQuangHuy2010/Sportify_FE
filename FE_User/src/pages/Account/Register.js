import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import images from "~/assets/images";
import styles from "./formAccount.module.scss"; // Import file CSS
import classNames from "classnames/bind"; //npm i classnames
const cx = classNames.bind(styles);
const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = (values) => {
    //console.log("Success:", values);
    // Xử lý logic login tại đây
  };

  const onFinishFailed = (errorInfo) => {
    //console.log("Failed:", errorInfo);
  };
  const showLogin = () => {
    navigate("/login"); // Điều hướng đến trang đăng ký
  };
  return (
    <section className={cx("section mt-5")}>
  <div className={cx("container")}>
    <div className={cx("row")}>
      {/* Image Section */}
      <div className="col-md-6 col-lg-6 col-xl-6">
        <div className={cx("imageContainer")}>
          <img src={images.imageLogin} alt="Phone illustration" />
        </div>
      </div>

      {/* Form Section */}
      <div className="col-md-6 col-lg-6 col-xl-6 mx-5 px-5 py-5">
        <h1 className="text-center fw-bold">{t("form-account.register")}</h1>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={cx("formContainer")}
        >
          {/* Email Input */}
          <Form.Item
            label={t("form-account.emailLabel")}
            name="email"
          >
            <Input
              size="large"
              placeholder={t("form-account.email-placeholder")}
            />
          </Form.Item>
          {/* Password Input */}
          <Form.Item
            label={t("form-account.passwordLabel")}
            name="password"
          >
            <Input.Password
              size="large"
              placeholder={t("form-account.password-placeholder")}
            />
          </Form.Item>
          {/* Confirm Password Input */}
          <Form.Item
            label={t("form-account.confirmPasswordLabel")}
            name="confirm-password"
          >
            <Input.Password
              size="large"
              placeholder={t("form-account.confirmPasswordPlaceholder")}
            />
          </Form.Item>
          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="mb-3"
            >
              {t("form-account.submit")}
            </Button>
          </Form.Item>
          <div className="text-center mb-2">
            <span className="me-2">{t("form-account.alreadyHaveAccount")}</span>
            <button
              className="bg-white text-primary btn-link"
              onClick={showLogin}
            >
              {t("form-account.login")}
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</section>
  );
};

export default Register;
