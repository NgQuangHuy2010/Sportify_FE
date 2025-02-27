import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { login } from "~/services/login";
import images from "~/assets/images";
import styles from "./formAccount.module.scss"; // Import file CSS
import classNames from "classnames/bind"; //npm i classnames
const cx = classNames.bind(styles);
const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const validationRules = {
    email: {
      required: { value: true, message: "Vui lòng nhập email" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Email không hợp lệ",
      },
    },
    password: {
      required: { value: true, message: "Vui lòng nhập mật khẩu" },
      minLength: {
        value: 6,
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      },
    },
  };

  
  const onSubmit = async (data) => {
    try {
      const requestData = {
        usernameOrEmail: data.email,  
        password: data.password,
      };
  
      const response = await login(requestData);
      // console.log("Phản hồi từ server:", response);
  
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("token-login", token);
        window.dispatchEvent(new Event("storage"));
        navigate("/home"); // Chỉ chuyển trang khi đăng nhập thành công
      } else {
        throw new Error("Token không tồn tại!"); // Xử lý khi API không trả về token
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
  
      // Kiểm tra nếu error từ API báo sai tài khoản/mật khẩu
      if (error.response?.status === 401 || error.response?.data?.message === "User not found") {
        setError("email", {
          type: "manual",
          message: "Sai tài khoản hoặc mật khẩu! Vui lòng thử lại",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "Đã xảy ra lỗi. Vui lòng thử lại sau!",
        });
      }
    }
  };
  
  

  const showRegister = () => {
    navigate("/register"); // Điều hướng đến trang đăng ký
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
              onFinish={handleSubmit(onSubmit)}
            >
              {/* Email Input */}
              <Form.Item label={t("form-account.emailLabel")}>
                <Controller
                  name="email"
                  rules={validationRules.email}
                  control={control}
      
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      placeholder={t("form-account.email-placeholder")}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Item>
              {/* Password Input */}
              <Form.Item label={t("form-account.passwordLabel")}>
                <Controller
                  name="password"
                  control={control}
                  rules={validationRules.password}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      size="large"
                      placeholder={t("form-account.password-placeholder")}
                      autoComplete="current-password"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
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
