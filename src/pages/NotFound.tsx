import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <Frown className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/dashboard"
        className="px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
      >
        Go to Dashboard
      </Link>
    </motion.div>
  );
}
