import * as request from "~/utils/httpRequest";



export const getAllSport = async () => {
  try {
    const res = await request.get('admin/sports');
    return res; 
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return false;
  }
};

