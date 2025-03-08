import * as request from "~/utils/httpRequest";

export const sendInvitation = async (receiverId, token) => {
  try {
    const url = `connections/send/${receiverId}`;

    const res = await request.post(
      url,
      {}, // Để trống request body nếu không có data
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Failed:", error.response?.data || error.message);
    throw error;
  }
};



export const deleteInvitation = async (receiverId, token) => {
    try {
      const url = `connections/cancel/${receiverId}`;
      
      const res = await request.deleteById(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Đảm bảo gửi token
        },
      });
  
      return res;
    } catch (error) {
      console.error("Failed:", error.response?.data || error.message);
      throw error;
    }
  };


  export const getPendingFriends = async (token) => {
    try {
      const res = await request.get('connections/pending', {
           headers: { Authorization: `Bearer ${token}` }, // Thêm token vào headers
         });
      return res; 
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      return false;
    }
  };

  export const acceptFriends = async (requestId) => {
    try {
      const res = await request.post(`connections/accept/${requestId}`, null, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      console.error("Failed:", error);
      throw error;
    }
  };
  

  export const getAllFriends = async (token) => {
    try {
      const res = await request.get('connections/friends', {
           headers: { Authorization: `Bearer ${token}` }, // Thêm token vào headers
         });
      return res; 
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      return false;
    }
  };