import React, { useEffect, useState } from "react";
import { Button, Steps, message } from "antd";
import ChooseSport from "./formChooseSport";
import RegisterInfoUser from "./formRegisterInfoUser";
import styles from "./formStepsRegisterUser.module.scss"; // Import file CSS
import classNames from "classnames/bind"; //npm i classnames
import { registerProfile } from "~/services/registerProfileService";
import { useLocation, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const RegisterInformation = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  // State lưu trữ dữ liệu từ các bước
  const [formData, setFormData] = useState({
    sports: [],
    userInfo: {},
  });
  const userAccount = location.state?.userData || {};
  // Lưu dữ liệu từ các bước
  const handleStepData = (step, data) => {
    if (step === 0) {
      setFormData((prev) => ({ ...prev, sports: data }));
    } else if (step === 1) {
      setFormData((prev) => ({ ...prev, userInfo: data }));
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const formatDataForApi = () => {
    const { userInfo, sports } = formData;

    return {
      email: userAccount.email || '',  
      password: userAccount.password || '', 
      firstname: userInfo.firstName || '',
      lastname: userInfo.lastName || '',
      birthday:userInfo.dob,
      phone: userInfo.phone || '',
      avatar: userInfo.preview || '',
      bio: userInfo.bio || '',
      gender: userInfo.gender || '',
      sports: sports,
      address: {
        no: userInfo.address?.address || '',
        city: userInfo.address?.city || '',
        district: userInfo.address?.district || '',
        ward: userInfo.address?.ward || '',
      },
    };
  };


  const handleComplete = async () => {
    const formattedData = formatDataForApi();  // Chuyển dữ liệu sang dạng đúng
    console.log("Dữ liệu đăng ký:", formattedData);
  
    try {
      const response = await registerProfile(formattedData); // Gửi dữ liệu lên server
      console.log("Dữ liệu phản hồi từ server:", response);
      message.success("Đăng ký thành công!");
      localStorage.setItem("isRegistered", "true");
      navigate("/home",{ replace: true });
    } catch (error) {
      message.error("Đã có lỗi xảy ra khi đăng ký.");
    }
  };


  const steps = [
    {
      title: "Chọn các môn thể thao yêu thích",
      content: (
        <ChooseSport
          initialData={formData.sports}
          onSubmit={(data) => {
            handleStepData(0, data);
            next();
          }}
        />
      ),
    },
    {
      title: "Thêm thông tin cá nhân",
      content: (
        <RegisterInfoUser
          initialData={formData.userInfo}
          onSubmit={(data) => {
            handleStepData(1, data);
            next();
          }}
          prev={prev}
        />
      ),
    },
    {
      title: "Hoàn thành",
      content: (
        <div>
          <h1><img src="https://img.icons8.com/papercut/80/ok.png" alt="icon success"/> Đăng ký thành công</h1>
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <div className="p-5 m-5">
      <Steps current={current} items={items} />
      <div
      className={cx("step-content-container active","d-flex justify-content-center align-items-center")}
      style={{height:"400px",marginTop:50}}
      >
        {steps[current].content}
      </div>
      <div style={{ marginTop: 24 }}>
        {/* Nút Hoàn tất ở bước cuối */}
        {current === steps.length - 1 && (
          <div className="d-flex justify-content-between">
            <Button style={{ margin: "0 8px" }} onClick={prev}>
              <i className="fa-solid fa-arrow-left"></i> Quay lại
            </Button>
            <Button type="primary" onClick={handleComplete}>
              Hoàn tất <i className="fa-solid fa-check"></i>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterInformation;
