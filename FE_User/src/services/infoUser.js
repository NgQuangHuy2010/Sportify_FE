import * as request from '~/utils/httpRequest';

export const infoUser = async (token) => {
  try {
    const res = await request.get('info-user', {
      headers: { Authorization: `Bearer ${token}` }, // Thêm token vào headers
    });

    return res; // Trả về thông tin user
  } catch (error) {
    console.error("Lỗi: ", error.response?.data || error.message);
    return null;
  }
};
