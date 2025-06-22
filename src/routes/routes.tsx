import { Route, Routes } from "react-router-dom";
import DashboardLayout from "@/layout/DashboardLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Analytics from "@/pages/Analytics";
import Setting from "@/pages/Setting";
import Login from "@/pages/Login";
import ProtectedRoute from "./privateRoute";
import Articles from "@/pages/Articles";
import Quotes from "@/pages/Quotes";
import Videos from "@/pages/Videos";



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
        <Route path="/settings" element={<Setting />} />
        <Route path="/about" element={<About />} />

         <Route path="/articles" element={<Articles />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/videos" element={<Videos />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
