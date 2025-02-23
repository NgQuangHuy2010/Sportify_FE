import React, { useState } from "react";
import { Switch, Form, Radio, Slider } from "antd";
import { useTranslation } from "react-i18next";
// import classNames from "classnames/bind";
// import styles from "./ConnectionSettings.module.scss";
import ScheduleSport from "./ScheduleSport";
// const cx = classNames.bind(styles);

function ConnectionSettings() {
  const { t } = useTranslation();

  const [ageRange, setAgeRange] = useState([15, 80]);
  const onChange = (checked) => {
    //console.log(`Switch state: ${checked}`);
  };
  const onAgeChange = (value) => {
    //console.log('Selected Age Range:', value);
    setAgeRange(value);
  };
  return (
    <>
      <Form.Item label={t("modal-profile.visibility-toggle")} valuePropName="checked">
        <div className="d-flex justify-content-between rounded-4 border p-4">
          <span className="fw-normal">{t("modal-profile.visibility-description")}</span>
          <Switch defaultChecked onChange={onChange} />
        </div>
      </Form.Item>

      <Form.Item label={t("modal-profile.gender-selection")}>
        <Radio.Group defaultValue="any">
          <Radio className="fw-normal" value="male">
          {t("modal-profile.gender-male")}
          </Radio>
          <Radio className="fw-normal" value="female">
          {t("modal-profile.gender-female")}
          </Radio>
          <Radio className="fw-normal" value="any">
          {t("modal-profile.gender-any")}
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label={t("modal-profile.age-selection")}>
        <span>
        {t("modal-profile.age-range", { min: ageRange[0], max: ageRange[1] })}
        </span>
        <Slider
          range
          min={15}
          max={80}
          defaultValue={[15, 80]}
          onChange={onAgeChange}
          tooltip={{ formatter: (value) => `${value} ${t("modal-profile.age")}` }}
        />
      </Form.Item>
      <ScheduleSport />
    </>
  );
}

export default ConnectionSettings;
