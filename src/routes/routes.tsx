import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import DashboardLayout from "@/layout/DashboardLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Analytics from "@/pages/Analytics";
import Setting from "@/pages/Setting";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<div className="text-white">Home</div>} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
