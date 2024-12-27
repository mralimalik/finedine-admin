import React, { useState } from "react";
import { UsersContext } from "../../context/UsersContext.jsx";
import { useContext, useEffect } from "react";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import CreateUser from "../../components/CreateUserSideSheet/CreateUser.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const Users = () => {
  const { fetchAllUsers, users } = useContext(UsersContext);
  const { setLoading } = useContext(AuthContext);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchAllUsers(setLoading);
  }, []);

  const handleCreateUserClick = () => {
    setSelectedUser(null);
    setIsCreateUserOpen(true);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsCreateUserOpen(true);
  };

  const handleCloseCreateUser = () => {
    setIsCreateUserOpen(false);
  };

  return (
    <div>
      <div className="bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <div className="flex justify-end my-2">
          <CustomButton label="Create User" onClick={handleCreateUserClick} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 h-full overflow-y-auto">
        {users?.map((user) => (
          <div
            key={user?._id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer transform transition duration-300 ease-in-out hover:shadow-lg hover:translate-y-1"
            onClick={() => handleUserClick(user)}
          >
            <h2 className="text-xl font-semibold mb-2">
              {`${user?.firstName || "Name Not Set"} ${user?.lastName}`}
            </h2>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <p className="text-gray-600">Total Venues: {user?.venues?.length || 0}</p>
          </div>
        ))}
      </div>
      {isCreateUserOpen && (
        <CreateUser onClose={handleCloseCreateUser} editUser={selectedUser} />
      )}
    </div>
  );
};

export default Users;
