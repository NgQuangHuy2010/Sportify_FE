import React from "react";

import UserInfo from "./UserInfo/UserInfo";

import AvatarProfile from "./AvatarProfile/AvatarProfile";

function FormPersonalInformation({control}) {


  return (
    <div className="container py-4">
      <div className="row">
        {/* Avatar Display */}
        <div className="col-4">
          <AvatarProfile control={control}/>
        </div>

        {/* User Info */}
        <div className="col-8">
          <UserInfo control={control} />
        </div>
      </div>
    </div>
  );
}

export default FormPersonalInformation;
