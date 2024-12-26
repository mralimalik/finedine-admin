import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Users from "./pages/Users/Users.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UsersContextProvider } from "./context/UsersContext.jsx";
import Layout from "./pages/Layout/Layout.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <UsersContextProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes with Sidebar */}
              <Route path="/" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Fallback for Undefined Routes */}
              <Route path="*" element={<NoRouteView />} />
            </Routes>
          </UsersContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

const NoRouteView = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      Nothing Found
    </div>
  );
};
