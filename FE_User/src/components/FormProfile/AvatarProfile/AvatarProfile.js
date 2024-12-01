import { Box, Modal, Slider, Button } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AvatarEditor from "react-avatar-editor";
import ContentEditable from "react-contenteditable";
import classNames from "classnames/bind";
import styles from "./AvatarProfile.module.scss"; // Đảm bảo bạn import đúng CSS module của mình
import { t } from "i18next";
const cx = classNames.bind(styles);
// Styles
const boxStyle = {
  width: "300px",
  height: "300px",
  display: "flex",
  flexFlow: "column",
  justifyContent: "center",
  alignItems: "center",
};
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

// Modal
const CropperModal = ({ src, modalOpen, setModalOpen, setPreview }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);
  const { t } = useTranslation();

  //handle save
  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = cropRef.current.getImage().toDataURL();
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(URL.createObjectURL(blob));
      setModalOpen(false);
    }
  };

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: "0 auto",
            width: "80%",
            color: "cyan",
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            padding: "10px",
          }}
        >
          <Button
            size="large"
            sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={(e) => setModalOpen(false)}
          >
            {t("modal-profile.button-cancel-cropper-image")}
          </Button>
          <Button
            sx={{ background: "#5596e6" }}
            size="large"
            variant="contained"
            onClick={handleSave}
          >
            {t("modal-profile.button-save-cropper-image")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Container
const AvatarProfile = () => {
  // image src
  const [src, setSrc] = useState(null);

  // preview
  const [preview, setPreview] = useState(null);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const contentEditableRef = useRef(null);
  const [bio, setBio] = useState("Đây là đoạn giới thiệu ban đầu của tôi");

  const handleChange = (event) => {
    setBio(event.target.value);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      const el = contentEditableRef.current;
      el?.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false); // Di chuyển con trỏ đến cuối
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false); // Đóng chế độ chỉnh sửa khi mất focus
  };

  // handle Click
  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    
    // Kiểm tra xem file có phải là hình ảnh không
    if (file && file.type.startsWith("image/")) {
      setSrc(URL.createObjectURL(file));
      setModalOpen(true);
    } else {
      alert("Vui lòng chọn một tệp hình ảnh!");
      setModalOpen(false);
    }
  };
  
  return (
    <>
      <main className={cx("container")}>
        <div className={cx("img-container")}>
          <img
            src={preview || require("~/components/Chat/images/ram.png")}
            alt=""
            width="100"
            height="100"
          />
        </div>
        <CropperModal
          modalOpen={modalOpen}
          src={src}
          setPreview={setPreview}
          setModalOpen={setModalOpen}
        />
        <a href="/" onClick={handleInputClick} className="fs-4">
          {/* <FcAddImage className="add-icon" /> */}
          <i className="fa-solid fa-upload pe-3"></i>
          <small>{t("modal-profile.button-upload-avatar")}</small>
        </a>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
        />

        <div className="mt-5">
          <label className="pb-3 fs-4">{t("modal-profile.label-form-infor-personal-about_me")}</label>
          <span
            onClick={enableEditing}
            className={cx("edit-icon", { active: isEditing },"px-2")}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </span>
          <ContentEditable
            innerRef={contentEditableRef}
            html={bio} // Nội dung hiển thị
            onChange={handleChange} // Lắng nghe sự thay đổi nội dung
            onFocus={() => setIsEditing(true)} // Chuyển sang trạng thái chỉnh sửa
            onBlur={handleBlur} // Đóng chế độ chỉnh sửa khi nhấn ra ngoài
            tagName="div" // Thẻ HTML chứa nội dung (p, div, hoặc span)
            className={cx("bio-text", { editing: isEditing })}
          />
        </div>
      </main>
    </>
  );
};

export default AvatarProfile;
