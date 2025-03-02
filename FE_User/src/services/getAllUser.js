import * as request from "~/utils/httpRequest";



export const getAllUser = async () => {
  try {
    const res = await request.get("get-all-user");
    console.log("API Response:", res);
    return res; 
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return false;
  }
};