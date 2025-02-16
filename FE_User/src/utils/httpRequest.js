import axios from "axios";

const httpRequest = axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
})

export const get = async (url,options={})=>{
    const response =await httpRequest.get(url,options);
    return response.data;
}

export const post = async (url, data, config = {}) => {
    return await httpRequest.post(url, data, config);
};
export default httpRequest