import * as request from "~/utils/httpRequest";



export const getAllVenues = async () => {
  try {
    const res = await request.get('admin/sports-centers');
    return res; 
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return false;
  }
};


export const getVenues_Sports_Fields = async (id) => {
    try {
      const res = await request.get(`admin/sports-fields/center/${id}`);
      return res; 
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      return false;
    }
  };


export const getBookedSlots = async (sportFieldId, bookingDate) => {
    try {
      const res = await request.get(
        `/bookings/booked-time-slots?sportFieldId=${sportFieldId}&bookingDate=${bookingDate}`
      );
      return res;
    } catch (error) {
      console.error("Error fetching booked slots:", error.response?.data || error.message);
      return false;
    }
  }; 


  export const postBookedSlots = async (data) => {
    console.log("Data gửi lên server:", data);
    try {
      const res = await request.post("bookings", data, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      console.error("Failed:", error);
      throw error;
    }
  };
  

  //check xem bao nhiu ng đã đặt
  export const getBookingInfo = async (sportFieldId, timeSlotId, bookingDate) => {
    // console.log(bookingDate);
    
    try {
      const res = await request.get(`bookings/info`, {
        params: { sportFieldId, timeSlotId, bookingDate },
      });
      return res;
    } catch (error) {
      console.error("Lỗi lấy thông tin đặt sân:", error);
      throw error;
    }
  };
  

// hủy đặt
export const cancelBookingAPI = async (timeSlotId,userId) => {
  console.log(userId);
  try {
    
    const res = await request.deleteById(`/bookings/${timeSlotId}/cancel?userId=${userId}`);
    return res;
  } catch (error) {
    throw error;
  }
};
