import React, { useEffect, useState } from "react";
import { Switch, Form, Radio, Slider } from "antd";
import { useTranslation } from "react-i18next";
// import classNames from "classnames/bind";
// import styles from "./ConnectionSettings.module.scss";
import ScheduleSport from "./ScheduleSport";
import { Controller } from "react-hook-form";
// const cx = classNames.bind(styles);

function ConnectionSettings({ control, userInfo, setValue }) {
  // console.log("user connect", userInfo);

  const { t } = useTranslation();

  const connectSetting = userInfo?.connectSetting || {};

  // State cho Switch (status)
  const [isConnected, setIsConnected] = useState(connectSetting.status === 1);

  // State cho Radio (genderFind)
  const [selectedGender, setSelectedGender] = useState(
    connectSetting.genderFind || "2"
  );

  const [ageRange, setAgeRange] = useState([15, 80]);

  useEffect(() => {
    // Khi `userInfo` thay đổi, cập nhật lại state
    setIsConnected(connectSetting.status === 1);
    setSelectedGender(connectSetting.genderFind || "2");
  }, [userInfo]);

  const onSwitchChange = (checked) => {
    setIsConnected(checked);
  };

  const onGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const onAgeChange = (value) => {
    //console.log('Selected Age Range:', value);
    setAgeRange(value);
  };

  return (
    <>
      <Form.Item
        label={t("modal-profile.visibility-toggle")}
        valuePropName="checked"
      >
        <div className="d-flex justify-content-between rounded-4 border p-4">
          <span className="fw-normal">
            {t("modal-profile.visibility-description")}
          </span>
          <Controller
            name="status"
            control={control}
            defaultValue={connectSetting.status === 1}
            render={({ field }) => <Switch {...field} checked={field.value} />}
          />
        </div>
      </Form.Item>

      {/* Gender Selection */}
      <Form.Item label={t("modal-profile.gender-selection")}>
        <Controller
          name="genderFind"
          control={control}
          defaultValue={connectSetting.genderFind || "2"}
          render={({ field }) => (
            <Radio.Group {...field}>
              <Radio className="fw-normal" value="1">
                {t("modal-profile.gender-male")}
              </Radio>
              <Radio className="fw-normal" value="0">
                {t("modal-profile.gender-female")}
              </Radio>
              <Radio className="fw-normal" value="2">
                {t("modal-profile.gender-any")}
              </Radio>
            </Radio.Group>
          )}
        />
      </Form.Item>

      {/* Age Range Slider */}
      <Form.Item label={t("modal-profile.age-selection")}>
        <Controller
          name="ageRange"
          control={control}
          defaultValue={[
            userInfo.connectSetting.ageMin || 15,
            userInfo.connectSetting.ageMax || 80,
          ]}
          render={({ field }) => (
            <>
              <span>
                {t("modal-profile.age-range", {
                  min: field.value[0],
                  max: field.value[1],
                })}
              </span>
              <Slider
                range
                min={15}
                max={80}
                {...field}
                onChange={(value) => {
                  field.onChange(value); // Cập nhật giá trị vào form
                  setValue("ageMin", value[0]); // 🔥 Đặt ageMin
                  setValue("ageMax", value[1]); // 🔥 Đặt ageMax
                }}
                tooltip={{
                  formatter: (value) => `${value} ${t("modal-profile.age")}`,
                }}
              />
            </>
          )}
        />
      </Form.Item>
      <ScheduleSport />
    </>
  );
}

export default ConnectionSettings;
