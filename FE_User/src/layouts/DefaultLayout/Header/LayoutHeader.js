import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate , useLocation} from "react-router-dom";
import classNames from "classnames/bind"; //npm i classnames
import "@fortawesome/fontawesome-free/css/all.min.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
//class
import styles from "./Header.module.scss";
import images from "~/assets/images";
import Menu from "~/components/Popper/Menu/Menu";
import config from "~/config";
import LanguageDropdown from "./LanguageDropdown";
import ModalComponent from "~/components/ModalComponent/ModalComponent";
import FormConnectInformation from "~/components/FormProfile/Connection_Information";
import FormPersonalInformation from "~/components/FormProfile/Personal_Information";
import IndexHeaderItems from "~/components/ModalComponent/HeaderItemModal/IndexHeaderItemModal";
import { infoUser } from "~/services/infoUser";
import { updateProfile } from "~/services/updateProfile";
import { message } from "antd";
const cx = classNames.bind(styles);

const MENU_ITEM = [
  // {
  //   icon: <i className="fa-solid fa-language"></i>,
  //   title: "English",
  //   children: {
  //     title: "Language",
  //     data: [
  //       {
  //         code: "en",
  //         title: "English",
  //       },
  //       {
  //         code: "vie",
  //         title: "Tiếng Việt",
  //       },
  //     ],
  //   },
  // },
  // {
  //   icon: <i className="fa-solid fa-circle-question"></i>,
  //   title: "Feedback",
  //   to: "/feedback",
  // },
  // {
  //   icon: <i className="fa-regular fa-keyboard"></i>,
  //   title: "Keyboard",
  // },
];
function Header() {
  const [avatarPreview, setAvatarPreview] = useState(null); // State lưu ảnh preview

  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("formPersonal");
  const [userInfo, setUser] = useState(null);
  const { control, handleSubmit, setValue } = useForm();


  const formatDate = (date) => {
    if (!date) return null; // Nếu không có giá trị, trả về null
    const year = date.$y; // Lấy năm từ đối tượng Day.js
    const month = String(date.$M + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, cần +1 và định dạng 2 chữ số
    const day = String(date.$D).padStart(2, "0"); // Định dạng ngày thành 2 chữ số
    return `${year}-${month}-${day}`;
  };


  //modal profile
  const showModal =  () => {
    setIsModalOpen(true);
    setAvatarPreview(null);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSave =async (data) => {
    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,    
      email: userInfo.email,
      gender: data.gender ? data.gender.toUpperCase() : null,
      birthday: data.dob ? formatDate(data.dob) : null, 
      connectSetting: {
        status: data.status ? 1: 0,
        genderFind: data.genderFind,
        ageMin: data.ageRange[0],  
        ageMax: data.ageRange[1], 
      },
    };
    // console.log("test form", formattedData);
    const response = await updateProfile(userInfo.userId, formattedData);
    if (response) {
    closeModal();
    message.success("Cập nhật thành công!!!");
    } else {
      console.error("Update failed!");
    }
  };
  const handleCancel = () => {
    //console.log("Hủy");
    closeModal();
  };
  useEffect(() => {
    const checkToken = () => {
      setIsRegistered(!!localStorage.getItem("token-login"));
    };

    window.addEventListener("storage", checkToken); // Lắng nghe thay đổi trên localStorage
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token-login"); // Xóa token khỏi localStorage
    setIsRegistered(false); // Cập nhật state để ẩn menu user
    navigate("/login", { replace: true }); // Chuyển hướng về trang login
  };

  // check xem có token ko
  useEffect(() => {
    const token = localStorage.getItem("token-login");
    if (token) {
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
      if (location.pathname !== "/register") { 
        navigate("/login", { replace: true });
      } // Nếu không có token, về trang login
    }
  }, [navigate]);

  //lấy thông tin user
  useEffect(() => {
    const token = localStorage.getItem("token-login");
  
    if (token) {
      infoUser(token).then((data) => {
        if (data) setUser(data);
        // console.log(data);
      });
    }
    
  }, [localStorage.getItem("token-login")]); // 🔥 Theo dõi sự thay đổi của token
  

  const userMenu = [
    {
      icon: <i className="fa-solid fa-user"></i>,
      title: t("header.category-user-viewProfile"),
      onClick: showModal,
    },
    {
      icon: <i className="fa-solid fa-gear"></i>,
      title: t("header.category-user-settings"),
      to: "/setting",
    },
    // ...MENU_ITEM,  //tai su dung lai menu more
    {
      icon: <i className="fa-solid fa-right-from-bracket"></i>,
      title: t("header.category-user-logout"),
      onClick: handleLogout,
      separate: true,
    },
  ];
  const handleLogoClick = () => {
    if (isRegistered) {
      navigate(config.routes.home); // Điều hướng đến trang /home nếu có currentUser
    } else {
      navigate("/"); // Điều hướng đến trang hiện tại nếu không có currentUser
    }
  };

  return (
    <>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal} // Đóng modal khi onClose được gọi
        title={t("modal-profile.title-modal")}
        buttonSave={handleSubmit(handleSave)} // Hàm khi nhấn OK
        buttonCancel={handleCancel} // Hàm khi nhấn Hủy
        // buttonSave={handleSave}
      >
        {/* Nội dung của modal thay đổi tùy vào form được chọn */}
        <div>
          <IndexHeaderItems
            activeForm={activeForm}
            setActiveForm={setActiveForm}
          />
          {/* Hiển thị form tương ứng với `activeForm` */}
          {activeForm === "formPersonal" && (
            <FormPersonalInformation
              control={control}
              userInfo={userInfo}
              avatarPreview={avatarPreview}
              setAvatarPreview={setAvatarPreview}
            />
          )}
          {activeForm === "formConnect" && (
            <FormConnectInformation control={control} userInfo={userInfo} setValue={setValue}/>
          )}
        </div>
      </ModalComponent>

      <header className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("logo")} onClick={handleLogoClick}>
            <img src={images.logo} alt="imagelogo" />
          </div>

          <div className={cx("action")}>
            {isRegistered ? (
              <>
                <Tippy content={t("header.tippy-message")} placement="bottom">
                  <button
                    onClick={() => navigate(config.routes.message)}
                    className={cx("action-btn")}
                  >
                    <i className="fa-regular fa-message"></i>
                  </button>
                </Tippy>
                <Tippy
                  content={t("header.tippy-notifications")}
                  placement="bottom"
                >
                  <button className={cx("action-btn")}>
                    <i className="fa-regular fa-bell"></i>
                  </button>
                </Tippy>
                <Menu
                  key={i18n.language}
                  items={isRegistered ? userMenu : MENU_ITEM}
                >
                  <img
                    src={`${process.env.REACT_APP_PATH_IMAGE}avatar/${userInfo?.avatar}`}
                    className={cx("user-avatar")}
                    alt="Nguyen Huy"
                  />
                </Menu>
                <LanguageDropdown />
              </>
            ) : (
              <>
                {/* <Button
                  type="primary"
                  onClick={showLogin}
                  className={cx("me-3")}
                >
                  {t("header.button-login")}
                </Button> */}
                {/* <Button className={cx("btn-register")} onClick={showRegister}>
                  {t("header.button-register")}
                </Button> */}
                <LanguageDropdown />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
