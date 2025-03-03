import * as request from "~/utils/httpRequest";



export const getAllUser = async (token) => {
  try {
    const res = await request.get('userprofiles/get-all-user', {
         headers: { Authorization: `Bearer ${token}` }, // Thêm token vào headers
       });
  //  console.log("API Response:", res);
    return res; 
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return false;
  }
};