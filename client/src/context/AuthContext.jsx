import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { io } from "socket.io-client";
// import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  // const queryClient = useQueryClient();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(`${import.meta.env.VITE_BACKEND_API_URL}`);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    let token = localStorage.getItem("token");

    const isValid = (token) => {
      if (!token) return false;
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      const isExpired = decodedToken.exp < currentTimeInSeconds;
      return !isExpired;
    };

    setIsLoggedIn(isValid(token));

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, []);

  const authenticateUser = async (credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/login`,
        credentials
      );

      const { token, userInfo } = await response.data;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/entry`,
        {
          agency: userInfo.agency,
          userId: userInfo.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setUserData(userInfo);
      setIsLoggedIn(true);

      socketRef.current.emit("newUser", userInfo);

      return true;
    } catch (error) {
      return error.response.data.error;
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/user/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setUserData(response.data);
      } else {
        console.error("Failed to fetch user info");
      }
    } catch (error) {
      console.error("Error occurred while fetching user info:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    setUserData(null);
  };

  const value = {
    isLoggedIn,
    userData,
    authenticateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
