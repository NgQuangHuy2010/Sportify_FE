import * as request from "~/utils/httpRequest";


export const registerProfile = async (data) => {
    console.log("data trc khi ửi lên server", data);
    //đang có vấn đề về gửi sport lên server
    try {
        const formData = new FormData();

        // Kiểm tra và chỉ append những trường có giá trị
        if (data.firstname) formData.append("firstname", data.firstname);
        if (data.lastname) formData.append("lastname", data.lastname);
        if (data.email) formData.append("email", data.email);
        if (data.birthday) formData.append("birthday", data.birthday);
        if (data.phone) formData.append("phone", data.phone);
        if (data.avatar) formData.append("avatar", data.avatar);  
        if (data.bio) formData.append("bio", data.bio);
        if (data.gender) formData.append("gender", data.gender);

        // Môn thể thao (sports) là mảng, kiểm tra nếu có giá trị thì gửi
        if (data.sports && data.sports.length > 0) {
            formData.append("sports", JSON.stringify(data.sports));
        }

        // Địa chỉ, kiểm tra nếu có giá trị thì gửi
        if (data.address) {
            if (data.address.no) formData.append("address[no]", data.address.no);
            if (data.address.city) formData.append("address[city]", data.address.city);
            if (data.address.district) formData.append("address[district]", data.address.district);
            if (data.address.ward) formData.append("address[ward]", data.address.ward);
        }

        // Gửi yêu cầu với formData đã được chuẩn bị
        const res = await request.post("userprofiles/save", formData, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("res trả về từ api",res);
        
        return res.data;
    } catch (error) {
        console.error("Failed to create profile:", error);
        throw error;
    }
};

  