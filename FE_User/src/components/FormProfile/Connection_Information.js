// FormConnectInformation.js
import React from "react";
import AccountInformation from "./AccountInformation/AccountInformation";
import ConnectionSettings from "./ConnectionSettings/ConnectionSettings";
import { Form } from "antd";

function FormConnectInformation({control,userInfo,setValue}) {
  return (
    <Form
      layout="vertical"
      className="py-5"
      initialValues={{
        email: userInfo.email, // Giá trị mặc định cho email
        password: "11111111", // Giá trị mặc định cho password
      }}
    >
      <div className="row">
        <div className="col-3 pe-5" style={{ borderRight: "1px solid #ccc" }}>
          {" "}
          <AccountInformation userInfo={userInfo}/>
        </div>
        
        <div className="col-7 px-5" >
          {" "}
          <ConnectionSettings control={control} userInfo={userInfo} setValue={setValue} />
        </div>
      </div>
    </Form>
  );
}

export default FormConnectInformation;
