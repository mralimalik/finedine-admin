import { useState, useEffect, createContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../constants.js";
import { toast } from "react-toastify";

export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async (setLoading) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${baseUrl}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data.data);
        
      }
    } catch (error) {
      console.error("Error fetching users with venues", error);
    }finally{
      setLoading(false);
    }
  };

  const createUser = async (email, password, changeLogo, businessLogo, companyName,setLoading) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("Token");
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("changeLogo", changeLogo);
      formData.append("companyName", companyName);

      if (businessLogo) {
        formData.append("businessLogo", businessLogo);
      }

      const response = await axios.post(
        `${baseUrl}/admin/create/user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setUsers((prevUsers) => [...prevUsers, response.data.data]);
        toast.success("User created successfully");
      } else {
        toast.error(`Failed to create user: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error creating user", error);
      toast.error(`Failed to create user: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateUserBusinessImage = async (userId, businessLogo, companyName ,setLoading) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("Token");
      const formData = new FormData();
      formData.append("companyName", companyName);
      if (businessLogo) {
        formData.append("businessLogo", businessLogo);
      }

      const response = await axios.post(
        `${baseUrl}/admin/update/user/${userId}/businessImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? response.data.data : user
          )
        );
        toast.success("Business image updated successfully");
      } else {
        toast.error(`Failed to update business image: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating business image", error);
      toast.error(`Failed to update business image: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersContext.Provider
      value={{ users, setUsers, createUser, fetchAllUsers, updateUserBusinessImage }}
    >
      {children}
    </UsersContext.Provider>
  );
};
