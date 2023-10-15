import React, { createContext, useCallback, useContext, useState } from "react";

import AsyncOperationStatus from "../utils/AsyncOperationStatus";
import AuthService from "../services/authService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
  const [asyncStatus, setAsyncStatus] = useState(AsyncOperationStatus.default);

  const signin = useCallback(async (email, password) => {
    const authService = new AuthService();
    try {
      setAsyncStatus(AsyncOperationStatus.pending);
      let response = await authService.signin(email, password);
      setAsyncStatus(AsyncOperationStatus.success);
      localStorage.setItem("accessToken", response);
      return "You now may redirect to HomePage";
    } catch (error) {
      setAsyncStatus(AsyncOperationStatus.failure);
      return error.data.error;
    }
  }, []);

  const getAccessToken = useCallback(() => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
  }, []);

  const signup = useCallback(async (values) => {
    const authService = new AuthService();
    try {
      setAsyncStatus(AsyncOperationStatus.pending);
      const { userName, email, mobileNumber, password, gender } = values;
      let responseMsg = await authService.signup(
        userName,
        email,
        mobileNumber,
        password,
        gender
      );
      setAsyncStatus(AsyncOperationStatus.success);
      return responseMsg.data.message;
    } catch (error) {
      setAsyncStatus(AsyncOperationStatus.failure);
      return error.data.error;
    }
  }, []);

  const contextValue = {
    signin,
    signup,
    getAccessToken,
    asyncStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
