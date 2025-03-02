import { Box, Modal, Slider, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
const CropperModal = ({ src, modalOpen, setModalOpen, onCropComplete, originalFileName }) => {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef(null);
  const { t } = useTranslation();

  
  const handleSave = async () => {
    if (cropRef.current) {
      const canvas = cropRef.current.getImageScaledToCanvas();
      const size = 300;
      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = size;
      croppedCanvas.height = size;
      const ctx = croppedCanvas.getContext("2d");

      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(canvas, 0, 0, size, size);

      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const fileExtension = originalFileName.split('.').pop();
          const newFileName = `cropped.${fileExtension}`;
          const file = new File([blob], newFileName, { type: "image/png" });
          const previewUrl = URL.createObjectURL(file);
          setModalOpen(false);

          // 🛑 Gọi đúng prop `onCropComplete`
          onCropComplete(previewUrl, file);
        } else {
          console.error("❌ Không tạo được blob từ canvas!");
        }
      }, "image/png");
    } else {
      console.error("❌ cropRef.current không tồn tại!");
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
        <Slider
          min={10}
          max={50}
          sx={{ margin: "0 auto", width: "80%", color: "cyan" }}
          size="medium"
          value={slideValue}
          onChange={(e) => setSlideValue(e.target.value)}
        />
        <Box sx={{ display: "flex", padding: "10px" }}>
          <Button
            size="large"
            sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
            variant="outlined"
            onClick={() => setModalOpen(false)}
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


const AvatarProfile = ({ control, onChange ,userInfo, avatarPreview, setAvatarPreview}) => {  
  const [src, setSrc] = useState(null);
  const [originalFileName, setOriginalFileName] = useState("avatar.png");
  const [modalOpen, setModalOpen] = useState(false);
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const contentEditableRef = useRef(null);
  const [profileData, setProfileData] = useState({
    bio: "",
    file: null,
    preview: null,
  });


  
  const handleChange = (event) => {
    setProfileData((prev) => ({
      ...prev,
      bio: event.target.value,
    }));

    if (onChange) {
      onChange({ bio: event.target.value, file: profileData.file, preview: profileData.preview });
    }
  };

  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSrc(URL.createObjectURL(file));
      setOriginalFileName(file.name);
      setModalOpen(true);
    } else {
      alert("Vui lòng chọn một tệp hình ảnh!");
    }
  };

  // 🔥 Khi crop xong, lưu file vào state và truyền lên form
  const handleCropComplete = (previewUrl, file) => {
    setProfileData((prev) => {
      const newProfileData = {
        ...prev,
        file: file,
        preview: previewUrl,
      };
  
      // Gọi onChange với dữ liệu mới
      if (onChange) {
        onChange({
          bio: newProfileData.bio,
          file: newProfileData.file,
          preview: newProfileData.preview,
        });
      }
  
      return newProfileData;
    });
    try {
      setAvatarPreview(previewUrl);
    } catch (error) {
      console.error("Lỗi khi cập nhật Avatar Preview:", error);
    }
  
    // Cập nhật preview lên component cha
  };
  
  useEffect(() => {
    if (!avatarPreview) {
      setProfileData((prev) => ({
        ...prev,
        preview: `${process.env.REACT_APP_PATH_IMAGE}avatar/${userInfo?.avatar}`,
      }));
    }
  }, [userInfo, avatarPreview]);

  

  return (
    <>
      <main className={cx("container")}>
        <div className={cx("img-container")}>
          <img
         src={profileData.preview}
            alt=""
            width="100"
            height="100"
          />
        </div>
        <CropperModal
          modalOpen={modalOpen}
          src={src}
          originalFileName={originalFileName}
          onCropComplete={handleCropComplete} // ✅ Truyền đúng prop
          setModalOpen={setModalOpen}
        />

        <a href="/" onClick={handleInputClick} className="fs-4">
          <i className="fa-solid fa-upload pe-3"></i>
          <small>{t("modal-profile.button-upload-avatar")}</small>
        </a>
        <input type="file" accept="image/*" ref={inputRef} onChange={handleImgChange} />

        <div className="mt-5">
          <label className="pb-3 fs-4">{t("modal-profile.label-form-infor-personal-about_me")}</label>
          <span
            onClick={() => setIsEditing(true)}
            className={cx("edit-icon", { active: isEditing }, "px-2")}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </span>
          <ContentEditable
            innerRef={contentEditableRef}
            html={profileData.bio}
            onChange={handleChange}
            onFocus={() => setIsEditing(true)}
            onBlur={() => setIsEditing(false)}
            tagName="div"
            className={cx("bio-text", { editing: isEditing })}
          />
        </div>
      </main>
    </>
  );
};

export default AvatarProfile;
