import * as request from '~/utils/httpRequest';

export const updateAddress = async (id, data) => {
  try {
    const res = await request.put(`update-address-client/${id}`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return res; 
  } catch (error) {
    console.error("Lỗi: ", error.response?.data || error.message);
    return null;
  }
};
