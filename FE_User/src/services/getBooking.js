import * as request from '~/utils/httpRequest';

export const infoBooking = async (token) => {
  try {
    const res = await request.get('bookings', {
      headers: { Authorization: `Bearer ${token}` }, // Thêm token vào headers
    });

    return res; // Trả về thông tin user
  } catch (error) {
    console.error("Lỗi: ", error.response?.data || error.message);
    return null;
  }
};