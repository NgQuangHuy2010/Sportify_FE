import React from "react";
import HeaderItem from "./HeaderItemModal";
import styles from "./HeaderItemModal.module.scss";
import classNames from "classnames/bind"; //npm i classnames
import { useTranslation } from "react-i18next";

const cx = classNames.bind(styles);
const HeaderItems = ({ activeForm, setActiveForm }) => {
  const { t } = useTranslation();

  return (
    <div className={cx("header-items")}>
      <HeaderItem
        label={t("modal-profile.header-item-infor-personal")}
        activeForm={activeForm}
        setActiveForm={setActiveForm}
        activeFormValue="formPersonal"
      />
      <HeaderItem
        label={t("modal-profile.header-item-infor-connect")}
        activeForm={activeForm}
        setActiveForm={setActiveForm}
        activeFormValue="formConnect"
      />
    </div>
  );
};

export default HeaderItems;
