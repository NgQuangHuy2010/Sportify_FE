import * as request from "~/utils/httpRequest";




export const getTimeSlot = async (id) => {
    try {
      const res = await request.get(`time-slots/${id}`);
      return res; 
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      return false;
    }
  };
