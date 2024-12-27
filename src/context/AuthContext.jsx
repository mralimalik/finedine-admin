import { useState, useEffect, createContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../constants.js";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // to set loading while performing any api call
  const [loading, setLoading] = useState(false);
  // for storing current user data
  const [userData, setUserData] = useState({});
  //for storing jwt token of current user
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // to store data like token in local storeage in variables
  const setUserDataLocal = (currentUserData) => {
    setToken(currentUserData.token);
    localStorage.setItem("Token", currentUserData.token);
    setUserData(currentUserData.data.user);
  };

  // getting user token from local and fetching data from api , if error in token then go to login
  const getUserDataLocal = async () => {
    try {
      setLoading(true);
      const userToken = localStorage.getItem("Token");
      if (userToken) {
        setToken(userToken);
        await fetchAdminData(userToken);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error retrieving user token:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async (userToken) => {
    try {
      const response = await axios.get(`${baseUrl}/admin/`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      if (response.status === 200) {
        setUserData(response.data.data);
        
        console.log();
        
        if (location.pathname === "/login" || location.pathname === "/") {
          navigate("/users");
        }
      }
    } catch (err) {
      console.error(
        "Error fetching user data:",
        err.response?.data?.message || err
      );
      localStorage.removeItem("Token");
      navigate("/login");
    }
  };

  // Sign in function to call the API
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/admin/signin`, {
        email,
        password,
      });
      if (response.status === 200) {
        const currentUserData = response.data;
        setUserDataLocal(currentUserData);
        navigate("/users");
        toast.success("Logged In");
      }
    } catch (err) {
      toast.error(`Something went wrong: ${err.message || "Unknown error"}`);
      throw err.response?.data?.message || "An error occurred during sign-in.";
    }finally{
      setLoading(false);

    }
  };

  useEffect(() => {
    getUserDataLocal();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        userData,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
