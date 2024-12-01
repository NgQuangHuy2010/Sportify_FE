// HeaderItem.js
import React from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderItemModal.module.scss'; // Đảm bảo bạn import đúng CSS module của mình
const cx = classNames.bind(styles);

const HeaderItem = ({ label, activeForm, setActiveForm, activeFormValue }) => {
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => setActiveForm(activeFormValue)} // Thay đổi form khi nhấn vào
    >
      <h5
        className={cx('mb-0 me-4 mt-3', 'underlineActive', {
          underlineActiveActive: activeForm === activeFormValue,
        })}
      >
        {label}
      </h5>
    </div>
  );
};

export default HeaderItem;
