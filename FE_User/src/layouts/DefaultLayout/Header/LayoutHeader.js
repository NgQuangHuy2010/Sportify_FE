import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind"; //npm i classnames
import "@fortawesome/fontawesome-free/css/all.min.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Button } from "antd";
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
  const currentUser = true;
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("formPersonal");

  const { control, handleSubmit } = useForm();
  //modal profile
  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false); 
  };
  const handleSave = (data) => {
    //console.log("Đồng ý");
    console.log("test form", data);
  };
  const handleCancel = () => {
    //console.log("Hủy");
    closeModal();
  };
  //end modal profile

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
      to: "/logout",
      separate: true,
    },
  ];
  const handleLogoClick = () => {
    if (currentUser) {
      navigate(config.routes.home); // Điều hướng đến trang /home nếu có currentUser
    } else {
      navigate("/"); // Điều hướng đến trang hiện tại nếu không có currentUser
    }
  };
  const showLogin = () => {
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  // const showRegister = () => {
  //   navigate("/register"); // Điều hướng đến trang đăng ký
  // };
  return (
    <>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal} // Đóng modal khi onClose được gọi
        title={t("modal-profile.title-modal")}
        buttonSave={handleSubmit(handleSave)} // Hàm khi nhấn OK
        buttonCancel={handleCancel} // Hàm khi nhấn Hủy
      >
        {/* Nội dung của modal thay đổi tùy vào form được chọn */}
        <div>
          <IndexHeaderItems
            activeForm={activeForm}
            setActiveForm={setActiveForm}
          />
          {/* Hiển thị form tương ứng với `activeForm` */}
          {activeForm === "formPersonal" && (
            <FormPersonalInformation control={control} />
          )}
          {activeForm === "formConnect" && (
            <FormConnectInformation control={control} />
          )}
        </div>
      </ModalComponent>

      <header className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("logo")} onClick={handleLogoClick}>
            <img src={images.logo} alt="imagelogo" />
          </div>

          <div className={cx("action")}>
            {currentUser ? (
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
                  items={currentUser ? userMenu : MENU_ITEM}
                >
                  <img
                    src={require("~/components/Chat/images/ram.png")}
                    className={cx("user-avatar")}
                    alt="Nguyen Huy"
                  />
                </Menu>
                <LanguageDropdown />
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  onClick={showLogin}
                  className={cx("me-3")}
                >
                  {t("header.button-login")}
                </Button>
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
