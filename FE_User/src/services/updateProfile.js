import * as request from '~/utils/httpRequest';

export const updateProfile = async (id, data) => {
    console.log("data trucow skhi gửi đi ", data);
    
  try {
    const res = await request.put(`update-profile/${id}`, data, {
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
