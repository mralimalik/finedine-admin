import React, { useState, useContext, useEffect } from "react";
import CustomButton from "../CustomButton/CustomButton.jsx";
import ReuseTextField from "../ReuseTextField/ReuseTextField.jsx";
import ReuseImageContainer from "../ReuseImageContainer/ReuseImageContainer.jsx";
import { UsersContext } from "../../context/UsersContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const CreateUser = ({ onClose, editUser }) => {
  const { createUser, updateUserBusinessImage } = useContext(UsersContext);
  const { setLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    changeLogo: true,
    businessLogo: null,
    companyName: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) {
      setFormData({
        email: editUser.email,
        password: "",
        changeLogo: editUser.changeLogo,
        businessLogo: editUser.businessLogo,
        companyName: editUser.companyName ,
      });
    }
  }, [editUser]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (file) => {
    setFormData({
      ...formData,
      businessLogo: file,
    });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password && !editUser)
      newErrors.password = "Password is required";
    if (formData.password && formData.password.length < 6)
      newErrors.password = "Password must be greater than 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editUser) {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    try {
      if (editUser) {
        await updateUserBusinessImage(
          editUser._id,
          formData.businessLogo,
          formData.companyName,
          setLoading
        );
      } else {
        await createUser(
          formData.email,
          formData.password,
          formData.changeLogo,
          formData.businessLogo,
          formData.companyName,

          setLoading
        );
      }
      onClose();
    } catch (error) {
      console.log("error creating/updating user");
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getImageUrl = () => {
    if (formData.businessLogo instanceof File) {
      return URL.createObjectURL(formData.businessLogo);
    }
    return formData.businessLogo;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white w-96 h-full p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editUser ? "Update User" : "Create User"}
          </h2>
          <CustomButton
            label="Close"
            onClick={onClose}
            color="bg-transparent"
            textColor="text-black"
            className={" hover:bg-transparent hover:border"}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <ReuseTextField
            isDisabled={editUser ? true : false}
            label="Email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          {!editUser && (
            <ReuseTextField
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          )}
          <ReuseTextField
            label="Company Name"
            type="companyName"
            id="companyName"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
          />

          <ReuseImageContainer
            imageUrl={getImageUrl()}
            onImageChange={handleImageChange}
          />
          {errors.form && (
            <p className="text-red-500 text-xs italic">{errors.form}</p>
          )}
          <div className="flex justify-end">
            <CustomButton
              label={editUser ? "Update" : "Create"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
