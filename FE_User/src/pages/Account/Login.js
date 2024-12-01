import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import images from "~/assets/images";
import styles from "./formAccount.module.scss"; // Import file CSS
import classNames from "classnames/bind"; //npm i classnames
const cx = classNames.bind(styles);
const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const showRegister = () => {
    navigate("/register"); // Điều hướng đến trang đăng ký
  };
  const showRegisterInfo = () => {
    navigate("/register-infomation"); // Điều hướng đến trang đăng ký
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
            <h1 className="text-center fw-bold">
              {t("form-account.title-login")}
            </h1>
            <Form
              layout="vertical"
              autoComplete="off"
              className={cx("formContainer")}
            >
              {/* Email Input */}
              <Form.Item label={t("form-account.emailLabel")} name="email">
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

              {/* Remember Me & Forgot Password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Checkbox defaultChecked>
                  {t("form-account.rememberMe")}
                </Checkbox>
                <a href="#!" className="text-decoration-none">
                  {t("form-account.forgotPassword")}
                </a>
              </div>

              {/* Submit Button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className="mb-3"
                  onClick={showRegisterInfo}
                >
                  {t("form-account.signIn")}
                </Button>
              </Form.Item>
              <div className="text-center mb-2">
                <span className="me-2"> {t("form-account.noAccount")}</span>
                <button
                  className="bg-white text-primary btn-link"
                  onClick={showRegister}
                >
                  {t("form-account.register")}
                </button>
              </div>
              {/* Divider */}
              <div className={cx("divider")}>
                <p> {t("form-account.or")}</p>
              </div>

              {/* Social Buttons */}
              <div className="text-center">
                <button className={cx("bg-white")}>
                  <ul className="list-unstyled">
                    <li>
                      <img
                        className={cx("p-2", "img-social")}
                        src="https://img.icons8.com/color/30/google-logo.png"
                        alt="Phone illustration"
                      />
                    </li>
                    <li className="fs-5 fw-bold">Google</li>
                  </ul>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
