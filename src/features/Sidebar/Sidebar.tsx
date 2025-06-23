import { useSidebarStore } from "@/store/useSidebarStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaLongArrowAltLeft, FaQuoteLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useLocation } from "react-router-dom";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdArticle, MdVideoLibrary } from "react-icons/md";
import { Users } from "lucide-react";

const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);
  const location = useLocation();

  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "4rem" },
  };

const menuItems = [
  { to: "/dashboard", icon:<IoHome className="w-5 h-5" />, text: "Home" },
  { to: "/users", icon: <Users className="w-5 h-5" /> , text: "Users" },
  { to: "/articles", icon: <MdArticle className="w-5 h-5" />, text: "Articles" },
  { to: "/quotes", icon: <FaQuoteLeft className="w-5 h-5" />, text: "Quotes" },
  { to: "/videos", icon: <MdVideoLibrary className="w-5 h-5" />, text: "Videos" },
  { to: "/change-password", icon: <IoMdSettings className="w-5 h-5" />, text: "Password Settings" },
];


  return (
    <motion.aside
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`bg-primary text-white dark:bg-primary-dark border-r min-h-screen p-4 overflow-hidden flex flex-col ${
        !isOpen ? "px-10 items-center" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">
          {isOpen ? (
            "Lustless"
          ) : (
            <TbLayoutDashboardFilled className="w-7 h-7" />
          )}
        </h2>
        <Button className="ms-1" variant="ghost" size="sm" onClick={toggle}>
          {isOpen ? <FaLongArrowAltLeft /> : <FaLongArrowAltRight />}
        </Button>
      </div>

      <nav className="flex-1 mt-12">
        <TooltipProvider delayDuration={100}>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <motion.li
                key={item.to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {!isOpen ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.to}
                        className="w-10 h-10 flex items-center justify-center p-2 rounded-lg hover:bg-white hover:text-black dark:hover:bg-primary transition-colors"
                      >
                        {item.icon}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      {item.text}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Link
                    to={item.to}
                   className={`flex items-center justify-start p-2 rounded-lg transition-colors
  ${location.pathname === item.to
    ? "bg-white text-black dark:bg-primary"
    : "hover:bg-white hover:text-black dark:hover:bg-primary"}
`}

                  >
                    {item.icon}
                    <span className="ml-2 font-medium">{item.text}</span>
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
