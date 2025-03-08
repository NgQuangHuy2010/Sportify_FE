import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Button } from "antd";
import styles from "./formStepsRegisterUser.module.scss"; // Import file CSS
import classNames from "classnames/bind"; //npm i classnames
import { getAllSport } from "~/services/getSport";
const cx = classNames.bind(styles);




const ChooseSport = ({ initialData, onSubmit }) => {
  const [sportsOptions, setSportsOptions] = useState([]);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      sports: initialData || [],
    },
  });


  useEffect(() => {
    const fetchSports = async () => {
      const response = await getAllSport(); // Gọi API
      if (response) {
        setSportsOptions(response); // Gán dữ liệu API vào state
      }
    };

    fetchSports();
  }, []);



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
                  <div className={cx("sport-item")} key={option.id}>
                    <Checkbox value={option.id}>
                    <img
                    src={`${process.env.REACT_APP_PATH_IMAGE}sports/${option?.image}`}
                    className={cx("img-profile")}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%", 
                      objectFit: "cover",
                      marginRight: "16px",
                      cursor: "pointer",
                    }}
                  />
                      {option.sportName}</Checkbox>
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
