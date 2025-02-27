import * as request from "~/utils/httpRequest";


export const registerProfile = async (data) => {
    console.log("Dữ liệu trước khi gửi lên server:", data);

    try {
        const formData = new FormData();

        // Chuyển userProfileRequest thành JSON rồi gửi vào formData
        const userProfileRequest = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            birthday: data.birthday,
            phone: data.phone,
            bio: data.bio,
            gender: data.gender,
            sports: data.sports || [], // Mảng sports
            address: data.address || {}, // Object address
        };

        formData.append("userProfileRequest", JSON.stringify(userProfileRequest));

        // Thêm avatar nếu có
        if (data.avatar instanceof File) {
            console.log("✅ File ảnh hợp lệ:", data.avatar);
            formData.append("avatar", data.avatar);  
          } else {
            console.error("❌ Không tìm thấy file ảnh để gửi lên server!");
          }

        // Gửi request với FormData
        const res = await request.post("userprofiles/save", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Kết quả trả về từ API: ", res.data);
        return res.data;
    } catch (error) {
        console.error("Lỗi khi tạo profile:", error);
        throw error;
    }
};
