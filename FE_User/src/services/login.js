import * as request from "~/utils/httpRequest";


export const login = async (data) => {
// console.log("Dữ liệu trước khi gửi lên server:", data);

    try {
        const res = await request.post("auth/login", data, {
                headers: { "Content-Type": "application/json" },
        });

        // console.log("Kết quả trả về từ API: ", res);
        return res;
    } catch (error) {
        console.error("Lỗi khi tạo profile:", error);
        throw error;
    }
}