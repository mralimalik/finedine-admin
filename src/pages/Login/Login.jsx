import React from "react";
import { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { FaUserCircle } from "react-icons/fa";

const Login = () => {
  const { signIn, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      await signIn(email, password);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error);
    }
  };

  const buttonBgColor = email && password ? "bg-blue-600" : "bg-violet-200";

  return (
    <div className="h-screen bg-gray-800 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mx-4 sm:mx-0">
        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-6xl text-gray-700" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`${buttonBgColor} w-full py-3 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105`}
          >
            Login
          </button>
        </form>
        <ToastContainer />
        <LoadingIndicator loading={loading} />
      </div>
    </div>
  );
};

export default Login;
