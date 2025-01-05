import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Button } from "antd";
import styles from "./formStepsRegisterUser.module.scss"; // Import file CSS
import classNames from "classnames/bind"; //npm i classnames
const cx = classNames.bind(styles);
const sportsOptions = [
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/emoji/30/soccer-ball-emoji.png"
          alt="football"
          style={{ marginRight: 8 }}
        />
        Bóng đá
      </span>
    ),
    value: 4,
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/emoji/30/basketball-emoji.png"
          alt="basketball"
          style={{ marginRight: 8 }}
        />
        Bóng rổ
      </span>
    ),
    value: 5,
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/emoji/30/badminton-emoji.png"
          alt="badminton"
          style={{ marginRight: 8 }}
        />
        Cầu lông
      </span>
    ),
    value: 6,
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/emoji/30/volleyball-emoji.png"
          alt="volleyball"
          style={{ marginRight: 8 }}
        />
        Bóng chuyền
      </span>
    ),
    value: "volleyball",
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/emoji/30/tennis-emoji.png"
          alt="tennis"
          style={{ marginRight: 8 }}
        />
        Quần vợt
      </span>
    ),
    value: "tennis",
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/emoji/30/ping-pong-emoji.png"
          alt="table tennis"
          style={{ marginRight: 8 }}
        />
        Bóng bàn
      </span>
    ),
    value: "table_tennis",
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/emoji/30/field-hockey-emoji.png"
          alt="golf"
          style={{ marginRight: 8 }}
        />
        Golf
      </span>
    ),
    value: "golf",
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/emoji/30/ping-pong-emoji.png"
          alt="pickleball"
          style={{ marginRight: 8 }}
        />
        Pickleball
      </span>
    ),
    value: "pickleball",
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/emoji/30/person-swimming.png"
          alt="swimming"
          style={{ marginRight: 8 }}
        />
        Bơi
      </span>
    ),
    value: "swimming",
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/color/30/running--v2.png"
          alt="running"
          style={{ marginRight: 8 }}
        />
        Chạy bộ
      </span>
    ),
    value: "running",
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/color/30/cycling-skin-type-2.png"
          alt="cycling"
          style={{ marginRight: 8 }}
        />
        Đạp xe
      </span>
    ),
    value: "cycling",
  },
  {
    label: (
      <span>
        <img
          src="https://img.icons8.com/color/34/boxing.png"
          alt="boxing"
          style={{ marginRight: 8 }}
        />
        Boxing
      </span>
    ),
    value: "boxing",
  },
];

const ChooseSport = ({ initialData, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      sports: initialData || [],
    },
  });

  return (
    <form
    
      onSubmit={handleSubmit((data) => {
        onSubmit(data.sports); // Truyền dữ liệu lên component cha
      })}
    >
      <div className="d-flex justify-content-center pt-5 ">
        <Controller
          name="sports"
          control={control}
          render={({ field }) => (
            <Checkbox.Group {...field}>
              <div className={cx("sports-grid")}>
                {sportsOptions.map((option) => (
                  <div className={cx("sport-item")} key={option.value}>
                    <Checkbox value={option.value}>{option.label}</Checkbox>
                  </div>
                ))}
              </div>
            </Checkbox.Group>
          )}
        />
      </div>

      <div className="d-flex justify-content-end mt-3">
        <Button  type="primary" htmlType="submit" className="mt-3 px-5 ">
          Tiếp tục <i className="fa-solid fa-arrow-right"></i>
        </Button>
      </div>
    </form>
  );
};

export default ChooseSport;
