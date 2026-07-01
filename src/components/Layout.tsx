import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { getSavedProfiles } from "@/storage/listStorage";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({
  children,
  title,
}: LayoutProps) {
  const [savedCount, setSavedCount] = useState(
    getSavedProfiles().length
  );

  useEffect(() => {
    const updateCount = () => {
      setSavedCount(getSavedProfiles().length);
    };

    updateCount();

    window.addEventListener(
      "savedProfilesUpdated",
      updateCount
    );

    return () => {
      window.removeEventListener(
        "savedProfilesUpdated",
        updateCount
      );
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 min-h-screen"
    >
      <header className="mb-6 border-b pb-4 flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="text-xl font-semibold text-gray-900 transition-colors duration-200 hover:text-blue-600"
          >
            Influencer Search
          </Link>

          {title && (
            <h1 className="text-2xl mt-2">{title}</h1>
          )}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/saved"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            Saved ({savedCount})
          </Link>
        </motion.div>
      </header>

      <main>{children}</main>
    </motion.div>
  );
}