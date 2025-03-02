import React from "react";

import UserInfo from "./UserInfo/UserInfo";

import AvatarProfile from "./AvatarProfile/AvatarProfile";

function FormPersonalInformation({
  control,
  userInfo,
  avatarPreview,
  setAvatarPreview,
}) {
  return (
    <div className="container py-4">
      <div className="row">
        {/* Avatar Display */}
        <div className="col-4">
          <AvatarProfile
            control={control}
            userInfo={userInfo}
            avatarPreview={avatarPreview}
            setAvatarPreview={setAvatarPreview}
          />
        </div>

        {/* User Info */}
        <div className="col-8">
          <UserInfo control={control} userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
}

export default FormPersonalInformation;
