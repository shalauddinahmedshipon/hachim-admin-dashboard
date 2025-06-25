import { Link, useLocation } from "react-router-dom";
import {
  IoHome,
} from "react-icons/io5";
import {
  MdArticle,
  MdPayment,
  MdVideoLibrary,
} from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { FolderIcon, Settings, Users } from "lucide-react";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const menuItems = [
  { to: "/dashboard", icon: <IoHome className="w-5 h-5" />, text: "Home" },
  { to: "/users", icon: <Users className="w-5 h-5" />, text: "Users" },
  { to: "/subscription", icon: <FolderIcon className="w-5 h-5" />, text: "Subscriptions" },
  { to: "/payments", icon: <MdPayment className="w-5 h-5" />, text: "Payments" },
  { to: "/articles", icon: <MdArticle className="w-5 h-5" />, text: "Articles" },
  { to: "/quotes", icon: <FaQuoteLeft className="w-5 h-5" />, text: "Quotes" },
  { to: "/videos", icon: <MdVideoLibrary className="w-5 h-5" />, text: "Videos" },
  { to: "/change-password", icon: <Settings className="w-5 h-5" />, text: "Password Settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="h-full bg-primary dark:bg-primary-dark text-white p-4 border-r">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <TbLayoutDashboardFilled className="w-6 h-6" />
        Lustless
      </h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-white hover:text-black dark:hover:bg-primary ${
                  location.pathname === item.to ? "bg-white text-black" : ""
                }`}
              >
                {item.icon}
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
