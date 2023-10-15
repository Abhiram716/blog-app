import apiClient from "./apiService";

class AuthServcie {
  async signin(email, password) {
    try {
      const response = await apiClient.post("/api/auth/signin", {
        email,
        password,
      });
      return response.data.accessToken;
    } catch (error) {
      throw error.response;
    }
  }
  async signup(userName, email, mobileNumber, password, gender) {
    try {
      const response = await apiClient.post("/api/auth/signup", {
        userName,
        email,
        mobileNumber,
        password,
        gender,
      });
      return response;
    } catch (error) {
      throw error.response;
    }
  }
}

export default AuthServcie;
