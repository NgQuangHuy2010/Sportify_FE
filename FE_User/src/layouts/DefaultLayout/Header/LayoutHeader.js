import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
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
import { message, Modal, Badge } from "antd";
import { acceptFriends, getPendingFriends, rejectFriends } from "~/services/addsFriends";
import dayjs from "dayjs";
import FormBooking from "~/components/FormProfile/formBooking";
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
  const [visible, setVisible] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [isTippyVisible, setIsTippyVisible] = useState(false);
  const formatDate = (date) => {
    if (!date) return null; // Nếu không có giá trị, trả về null
    const year = date.$y; // Lấy năm từ đối tượng Day.js
    const month = String(date.$M + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, cần +1 và định dạng 2 chữ số
    const day = String(date.$D).padStart(2, "0"); // Định dạng ngày thành 2 chữ số
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setPendingCount(pendingRequests.length);
  }, [pendingRequests]);
  const handleOpenNotifications = () => {
    setIsTippyVisible(!isTippyVisible);
    setPendingCount(0); // Ẩn số thông báo khi mở danh sách
  };
  //modal info connect
  const showUserModal = (user) => {
    setSelectedUser(user);
    setIsInfoOpen(true);
  };
  //
  //modal profile
  const showModal = () => {
    setIsModalOpen(true);
    setAvatarPreview(null);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSave = async (data) => {
    console.log("Type of ageRange:", typeof data.ageRange);
    const ageRange = Array.isArray(data.ageRange)
      ? data.ageRange
      : typeof data.ageRange === "object" && data.ageRange !== null
      ? [data.ageRange.min ?? 0, data.ageRange.max ?? 0]
      : [0, 0];
    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: userInfo.email,
      gender: data.gender ? data.gender.toUpperCase() : null,
      birthday: data.dob ? formatDate(data.dob) : null,
      connectSetting: {
        status: data.status ? 1 : 0,
        genderFind: data.genderFind,
        ageMin: ageRange[0],
        ageMax: ageRange[1],
      },
    };
    console.log("test form", formattedData);
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
    getPendingFriends(token).then((data) => {
      if (data) setPendingRequests(data);
    });
  }, [localStorage.getItem("token-login")]);

  const userMenu = [
    {
      icon: <i className="fa-solid fa-user"></i>,
      title: t("header.category-user-viewProfile"),
      onClick: showModal,
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

  const handleAccept = async (id) => {
    try {
      console.log(`Accepted request from user ${id}`);

      const response = await acceptFriends(id);
      console.log("API Response:", response);
      message.success("Chấp nhận lời mời thành công!");
      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error("Lỗi khi chấp nhận yêu cầu:", error);
      message.error("Chấp nhận lời mời thất bại!");
    }
  };

  const handleDecline = async (id) => {
    try {
      console.log(`Declined request from user ${id}`);

      const response = await rejectFriends(id);
      console.log("API Response:", response);
      message.success("Từ chối lời mời thành công!");
      setPendingRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error("Lỗi khi từ chói yêu cầu:", error);
      message.error("Từ chối lời mời thất bại!");
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
            <FormConnectInformation
              control={control}
              userInfo={userInfo}
              setValue={setValue}
            />
          )}
          {activeForm === "formBooking" && (
            <FormBooking
              control={control}
              userInfo={userInfo}
              setValue={setValue}
            />
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
                  interactive={true}
                  placement="bottom"
                  visible={visible}
                  onClickOutside={() => setVisible(false)}
                  theme="light"
                  content={
                    <div className={cx("notification-dropdown")}>
                      <h3 style={{ color: "#000000", fontWeight: 600 }}>
                        Lời mời kết bạn
                      </h3>
                      {pendingRequests.length > 0 ? (
                        pendingRequests.map((request) => {
                          const sender = request.sender;
                          return (
                            <div
                              key={request.id}
                              className={cx("notification-item")}
                            >
                              <div className={cx("user-info")}>
                                <img
                                  src={`${process.env.REACT_APP_PATH_IMAGE}avatar/${sender.avatar}`}
                                  alt={`${sender.firstname} ${sender.lastname}`}
                                  className={cx("avatar")}
                                  onClick={() => showUserModal(sender)}
                                />
                                <span className={cx("user-name")}>
                                  {sender.lastname} {sender.firstname}
                                </span>
                              </div>
                              <div className={cx("actions")}>
                                <button
                                  className={cx("accept-btn")}
                                  onClick={() => handleAccept(request.id)}
                                >
                                  Chấp nhận
                                </button>
                                <button
                                  className={cx("decline-btn")}
                                  onClick={() => handleDecline(request.id)}
                                >
                                  Từ chối
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className={cx("no-requests")}>
                          Không có lời mời nào
                        </p>
                      )}
                    </div>
                  }
                >
                  <Badge count={pendingCount} offset={[10, 0]} size="small">
                    <button
                      className={cx("notification-btn")}
                      onClick={() => setVisible(!visible)}
                    >
                      <i className="fa-regular fa-bell"></i>
                    </button>
                  </Badge>
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
      {selectedUser && (
        <Modal
          title="Thông tin người dùng"
          open={isInfoOpen}
          onCancel={() => setIsInfoOpen(false)}
          footer={null}
        >
          <div className="container ">
            <div className="row align-items-center">
              {/* Cột bên trái: Hình ảnh */}
              <div className="col-md-4 text-center">
                <img
                  src={`${process.env.REACT_APP_PATH_IMAGE}avatar/${selectedUser.avatar}`}
                  alt={`${selectedUser.firstname} ${selectedUser.lastname}`}
                  className="img-fluid rounded-circle border border-secondary"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Cột bên phải: Thông tin */}
              <div className="col-md-8 " style={{ lineHeight: 1.8 }}>
                <div className="mb-3">
                  <h3>
                    {selectedUser.lastname} {selectedUser.firstname}
                  </h3>
                </div>
                <div>
                  <p>
                    <strong>Giới tính:</strong>{" "}
                    {selectedUser.gender === "MALE" ? "Nam" : "Nữ"}
                  </p>
                  <p>
                    <strong>Ngày sinh:</strong>{" "}
                    {dayjs(selectedUser.birthday).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <p className="pe-3">
                    <strong>Môn thể thao yêu thích:</strong>
                  </p>
                  <ul className="list-unstyled">
                    {selectedUser.sports.map((sport) => (
                      <span key={sport.id}>
                        <img
                          src={`${process.env.REACT_APP_PATH_IMAGE}sports/${sport.imageUrl}`}
                          alt={`${selectedUser.firstname} ${selectedUser.lastname}`}
                          className="img-fluid "
                          style={{ width: "25px" }}
                        />
                        {sport.sportName}
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Header;
