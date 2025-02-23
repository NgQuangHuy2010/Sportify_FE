import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

import { checkEmailExists } from "~/services/checkmail"; // Import API kiểm tra email

import images from "~/assets/images";
import styles from "./formAccount.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Register = () => {
  const { control, handleSubmit, watch, setError, clearErrors } = useForm();
  const [emailChecking, setEmailChecking] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = async (email) => {
    if (!email) return "Vui lòng nhập email";
    setEmailChecking(true);
    const isExist = await checkEmailExists(email);
    setEmailChecking(false);
    if (isExist) return "Email đã tồn tại, vui lòng nhập email khác";
    return true;
  };
  
  

  const validationRules = {
    email: {
      required: "Vui lòng nhập email",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email không hợp lệ",
      },
      validate: validateEmail,
    },
    password: {
      required: "Vui lòng nhập mật khẩu",
      minLength: {
        value: 6,
        message: "Mật khẩu ít nhất 6 ký tự",
      },
    },
    confirmPassword: {
      required: "Vui lòng nhập lại mật khẩu",
      validate: (value) => value === watch("password") || "Mật khẩu không khớp",
    },
  };

  const onSubmit = (data) => {
    // console.log("Dữ liệu đăng ký:", data);
    const userData = {
      email: data.email,
      password: data.password,
    };
    navigate("/register-infomation", { state: { userData} });
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
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)} autoComplete="off" className={cx("formContainer")}>
              {/* Email Input */}
              <Form.Item label={t("form-account.emailLabel")} name="email">
                <Controller
                  name="email"
                  control={control}
                  rules={validationRules.email}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        size="large"
                        placeholder={t("form-account.email-placeholder")}
                        onBlur={async () => {
                          const errorMessage = await validateEmail(field.value);
                          if (errorMessage !== true) {
                            setError("email", { type: "manual", message: errorMessage });
                          } else {
                            clearErrors("email");
                          }
                        }}
                      />
                      {fieldState.error && <p className="text-danger">{fieldState.error.message}</p>}
                    </>
                  )}
                />
              </Form.Item>

              {/* Password Input */}
              <Form.Item label={t("form-account.passwordLabel")} name="password">
                <Controller
                  name="password"
                  control={control}
                  rules={validationRules.password}
                  render={({ field, fieldState }) => (
                    <>
                      <Input.Password {...field} size="large" placeholder={t("form-account.password-placeholder")} />
                      {fieldState.error && <p className="text-danger">{fieldState.error.message}</p>}
                    </>
                  )}
                />
              </Form.Item>

              {/* Confirm Password Input */}
              <Form.Item label={t("form-account.confirmPasswordLabel")} name="confirmPassword">
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={validationRules.confirmPassword}
                  render={({ field, fieldState }) => (
                    <>
                      <Input.Password {...field} size="large" placeholder={t("form-account.confirmPasswordPlaceholder")} />
                      {fieldState.error && <p className="text-danger">{fieldState.error.message}</p>}
                    </>
                  )}
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block className="mb-3" loading={emailChecking}>
                  {t("form-account.submit")}
                </Button>
              </Form.Item>

              <div className="text-center mb-2">
                <span className="me-2">{t("form-account.alreadyHaveAccount")}</span>
                <button className="bg-white text-primary btn-link" onClick={() => navigate("/login")}>
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
