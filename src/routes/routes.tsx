import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import ProtectedRoute from "./privateRoute";
import Articles from "@/pages/Articles";
import Quotes from "@/pages/Quotes";
import Videos from "@/pages/Videos";
import ChangePassword from "@/pages/ChangePassword";
import User from "@/pages/User";
import Subscription from "@/pages/Subscription";
import Payment from "@/pages/Payment";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
         </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/about" element={<About />} />
         <Route path="/articles" element={<Articles />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/users" element={<User />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/payments" element={<Payment />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
