import { useSidebarStore } from "@/store/useSidebarStore";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoBarChartSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);

  const sidebarVariants = {
    open: { width: "16rem" },
    closed: { width: "4rem" },
  };

  const menuItems = [
    { to: "/dashboard", icon: <IoHome className="w-5 h-5" />, text: "Home" },
    {
      to: "/analytics",
      icon: <IoBarChartSharp className="w-5 h-5" />,
      text: "Analytics",
    },
    {
      to: "/settings",
      icon: <IoMdSettings className="w-5 h-5" />,
      text: "Settings",
    },
    { to: "/about", icon: <IoMdSettings className="w-5 h-5" />, text: "About" },
  ];

  return (
    <motion.aside
      initial={isOpen ? "open" : "closed"}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`bg-primary text-white dark:bg-primary-dark border-r min-h-screen p-4 overflow-hidden flex flex-col`}
    >
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{isOpen ? "Dashboard" : "D"}</h2>
        <Button variant="ghost" size="sm" onClick={toggle}>
          {isOpen ? <FaLongArrowAltLeft /> : <FaLongArrowAltRight />}
        </Button>
      </div>

      <nav className="flex-1">
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
                        className="flex items-center justify-center p-2 rounded-lg hover:bg-white hover:text-black dark:hover:bg-primary transition-colors"
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
                    className="flex items-center justify-start p-2 rounded-lg hover:bg-white hover:text-black dark:hover:bg-primary transition-colors"
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
