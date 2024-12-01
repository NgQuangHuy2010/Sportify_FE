import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TimePicker, Form, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
const animatedComponents = makeAnimated();



const TimeSlotPicker = ({ day, startTime, endTime, onTimeChange }) => {
  const { t } = useTranslation();

  return (
    <Form.Item label={t("schedule-sport.time-range-for", { day: day.label })}>
      <div className="d-flex justify-content-between">
        <TimePicker
          value={startTime}
          onChange={(time) => onTimeChange(day.value, "startTime", time)}
          format="HH:mm"
          placeholder={t("schedule-sport.start-time-placeholder")}
        />
        <span>đến</span>
        <TimePicker
          value={endTime}
          onChange={(time) => onTimeChange(day.value, "endTime", time)}
          format="HH:mm"
          placeholder={t("schedule-sport.end-time-placeholder")}
        />
      </div>
    </Form.Item>
  );
};

const ScheduleSport = () => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [isAllDaysSelected, setIsAllDaysSelected] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { t } = useTranslation();
  const daysOfWeek = [
    { value: 2, label: t("days.monday") },
    { value: 3, label: t("days.tuesday") },
    { value: 4, label: t("days.wednesday") },
    { value: 5, label: t("days.thursday") },
    { value: 6, label: t("days.friday") },                   
    { value: 7, label: t("days.saturday") },
    { value: 8, label: t("days.sunday") }
  ];
  const handleDaysChange = (selectedOptions) => {
    setSelectedDays(selectedOptions);
    const newSchedule = { ...schedule };
    selectedOptions.forEach((day) => {
      if (!newSchedule[day.value]) {
        newSchedule[day.value] = { startTime: null, endTime: null };
      }
    });
    setSchedule(newSchedule);
  };

  const onCheckAllSchedule = (e) => {
    const checked = e.target.checked;
    setIsAllDaysSelected(checked);

    if (checked) {
      // Nếu chọn "Tất cả các ngày", set tất cả các ngày với một thời gian chung
      const newSchedule = daysOfWeek.reduce((acc, day) => {
        acc[day.value] = { startTime, endTime }; // Đặt thời gian chung cho tất cả các ngày
        return acc;
      }, {});
      setSchedule(newSchedule);
    } else {
      // Nếu bỏ chọn "Tất cả các ngày", reset lại
      setSchedule([]);
      setSelectedDays([]);
    }
  };

  const handleTimeChange = (dayValue, type, time) => {
    const newSchedule = { ...schedule };


    if (!newSchedule[dayValue]) {
      newSchedule[dayValue] = {};
    }
    newSchedule[dayValue][type] = time;
    setSchedule(newSchedule);

    if (type === "startTime") {
      setStartTime(time);
    } else if (type === "endTime") {
      setEndTime(time);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <Form.Item label={t("schedule-sport.select-days")} name="days">
            <Select
              placeholder={t("schedule-sport.select-placeholder")}
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={daysOfWeek}
              isMulti
              onChange={handleDaysChange}
              isDisabled={isAllDaysSelected} // Disable Select nếu chọn Tất cả các ngày
            />
          </Form.Item>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <Checkbox onChange={onCheckAllSchedule}>
          {t("schedule-sport.all-days-checkbox")}
          </Checkbox>
        </div>
      </div>

      {/* Hiển thị TimePicker nếu chọn tất cả các ngày */}
      {isAllDaysSelected && (
        <TimeSlotPicker
        day={{ value: 0, label: t("schedule-sport.all-days-checkbox") }} // Chỉ hiển thị 1 mốc thời gian cho tất cả các ngày
          startTime={startTime}
          endTime={endTime}
          onTimeChange={handleTimeChange}
        />
      )}

      {/* Nếu không chọn "Tất cả các ngày", chỉ hiển thị khung giờ cho các ngày đã chọn */}
      {!isAllDaysSelected &&
        selectedDays.map((day) => (
          <TimeSlotPicker
            key={day.value}
            day={day}
            startTime={schedule[day.value]?.startTime}
            endTime={schedule[day.value]?.endTime}
            onTimeChange={handleTimeChange}
          />
        ))}
    </div>
  );
};

export default ScheduleSport;
