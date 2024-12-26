import React from "react";
import { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
const Login = () => {
  const { signIn,loading } = useContext(AuthContext);
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
    <div className="h-screen bg-slate-400 flex justify-center items-center">
      <div className=" w-[400px] h-[350px] bg-white flex flex-col p-5 gap-3 rounded-md">
        <span className="font-bold">Admin Login</span>
        <div className="h-[1px] w-full bg-slate-600"> </div>
        <div className="my-2">
          <input
            className="w-full p-2 border outline-none rounded-[10px] "
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-1">
          <input
            className="w-full p-2 border outline-none rounded-[10px] "
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className={`${buttonBgColor} p-1 text-white border rounded-md`}>
          Login
        </button>
        <ToastContainer />
        <LoadingIndicator loading={loading}/>
      </div>
    </div>
  );
};

export default Login;
