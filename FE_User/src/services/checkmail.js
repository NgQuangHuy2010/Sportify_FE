import * as request from '~/utils/httpRequest';

export const checkEmailExists = async (email) => {
  try {
    // console.log("Gọi API kiểm tra email:", email);
    const res = await request.get('auth/check-email', { params: { email } });
    // console.log("Raw Response:", res); // Kiểm tra dữ liệu nhận được
    return res; // Trả về trực tiếp true/false
  } catch (error) {
    console.error("Lỗi khi kiểm tra email:", error.response?.data || error.message);
    return false;
  }
};
