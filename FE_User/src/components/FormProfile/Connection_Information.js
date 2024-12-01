// FormConnectInformation.js
import React from "react";
import AccountInformation from "./AccountInformation/AccountInformation";
import ConnectionSettings from "./ConnectionSettings/ConnectionSettings";
import { Form } from "antd";

function FormConnectInformation() {
  return (
    <Form
      layout="vertical"
      className="py-5"
      initialValues={{
        email: "huy@gmail.com", // Giá trị mặc định cho email
        password: "11111111", // Giá trị mặc định cho password
      }}
    >
      <div className="row">
        <div className="col-3 pe-5" style={{ borderRight: "1px solid #ccc" }}>
          {" "}
          <AccountInformation />
        </div>
        
        <div className="col-7 px-5" >
          {" "}
          <ConnectionSettings />
        </div>
      </div>
    </Form>
  );
}

export default FormConnectInformation;
