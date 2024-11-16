import axios from "axios";

const loginService = {
  compareAccount: async (account) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/login/`,
        account
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },
  checkUsername: async (username) => {
    try {
      const response = axios.post(
        `http://localhost:5000/api/login/checkUsername`,
        username
      );
      return (await response).data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },
};
export default loginService;
